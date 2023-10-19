import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import AssistantIcon from '@mui/icons-material/Android';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import Box from '@mui/material/Box';

function Chat({ chatId }) {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    async function loadChat() {
      try {
        const apiUrl = `http://localhost:3001/api/chat/${chatId}`;
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const chatData = response.data.response.message;

        // Extract messages from the chat data
        const chatMessages = chatData.messages || [];

        // Skip the first two messages from the user and start from the third message
        const filteredMessages = chatMessages.slice(2);

        setMessages(filteredMessages);
      } catch (error) {
        console.error('Error loading chat:', error);
      }
    }

    loadChat();
  }, [chatId, token]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') {
      return;
    }

    try {
      const apiUrl = `http://localhost:3001/api/chat/${chatId}`;
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
      const newAssistantMessage = {
        role: 'assistant',
        content: assistantMessage,
      };

      setMessages((prevMessages) => [...prevMessages, { role: 'user', content: inputMessage }, newAssistantMessage]);
      setInputMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box
        flex={1}
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
              alignSelf: message.role === 'user' ? 'flex-start' : 'flex-end',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: message.role === 'user' ? 'row' : 'row-reverse',
              }}
            >
              {message.role === 'user' ? (
                <Avatar sx={{ color: '#1976d2', background: 'transparent' }}>
                  <AssistantIcon />
                </Avatar>
              ) : (
                <Avatar sx={{ color: '#1976d2', background: 'transparent' }}>
                  <PersonIcon />
                </Avatar>
              )}
              <Box
                sx={{
                  textAlign: 'left',
                  borderRadius: '8px',
                  padding: '8px',
                  marginLeft: '8px',
                  backgroundColor: message.role === 'user' ? 'lightgray' : 'white',
                }}
              >
                {message.content}
              </Box>
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
