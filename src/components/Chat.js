import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import AssistantIcon from '@mui/icons-material/Android';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import Box from '@mui/material/Box';

function Chat({ initialAssistantMessage, chatId }) {
  const { token } = useAuth();
  const [messages, setMessages] = useState([
    { text: initialAssistantMessage, isUser: false },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Function to replace newline characters with <br /> elements
  function formatAssistantMessage(message) {
    return message.replace(/\n/g, '<br />');
  }

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') {
      return;
    }

    const newMessage = { text: inputMessage, isUser: true };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage('');

    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/chat/${chatId}`;
      console.log(apiUrl);
      const requestData = {
        role: 'user',
        content: inputMessage,
      };

      const response = await axios.put(apiUrl, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const assistantMessage = response.data.response.message.content;
      const formattedAssistantMessage = formatAssistantMessage(assistantMessage);
      const newAssistantMessage = {
        text: formattedAssistantMessage,
        isUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, newAssistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box
        flex={1}
        // overflow="auto"
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        alignItems="flex-start"
        padding="16px"
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              margin: '8px',
              maxWidth: '70%',
              alignSelf: message.isUser ? 'flex-end' : 'flex-start',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: message.isUser ? 'row-reverse' : 'row',
              }}
            >
              {message.isUser ? (
                <Avatar sx={{ color: '#1976d2', background: 'transparent' }}>
                  <PersonIcon />
                </Avatar>
              ) : (
                <Avatar sx={{ color: '#1976d2', background: 'transparent' }}>
                  <AssistantIcon />
                </Avatar>
              )}
              <Box
                sx={{
                  textAlign: 'left',
                  borderRadius: '8px',
                  padding: '8px',
                  marginLeft: '8px',
                  backgroundColor: message.isUser ? 'white' : 'lightgray',
                }}
                // Render message text with HTML content
                dangerouslySetInnerHTML={{ __html: message.text }}
              ></Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Box display="flex" alignItems="center" padding="8px">
        <TextField
          label="Type your message"
          variant="outlined"
          value={inputMessage}
          onChange={(event) => setInputMessage(event.target.value)}
          sx={{ flex: 1, marginRight: '8px' }}
          InputProps={{
            endAdornment: (
              <SendIcon
                style={{ cursor: 'pointer' }}
                onClick={handleSendMessage}
                color={inputMessage.trim() ? 'primary' : 'disabled'}
              />
            ),
          }}
        />
      </Box>
    </Box>
  );
}

export default Chat;
