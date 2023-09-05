import React from 'react';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';
import { useAuth } from '../AuthContext'; // Import your AuthContext

function ChatInitiate({ onChatInitiate }) {
  const { token } = useAuth(); // Get the token from the AuthContext

  const startChat = async () => {
    try {
      const apiUrl = 'http://localhost:3001/api/chat';
      const requestData = {
        policy: false,
        doc_id: '64d5f0e8baf6a9db3f88dcde',
        messages: [
          {
            role: 'system',
            content: 'ABC company, Permanent employees have 14 annual leaves and 7 casual leaves. No pay is calculated using "Daily Rate = Monthly Salary / Number of Working Days in the Month" function. No sick or other leaves for employees. For permanent employees, study leaves are allowed with the approval of the supervisor. Trainees, Interns or probation employees have only one leave day for a 2 month. If the employee intend to get leave more than entitled, need supervisor or HR permission. Kevin is a permentent employee',
          },
          {
            role: 'user',
            content: 'Hi, I am Kevin Peterson.',
          },
        ],
      };

      const response = await axios.post(apiUrl, requestData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });

      const assistantMessage = response.data.response.message;
      console.log(response);

      onChatInitiate(assistantMessage.content, response.data.response.message.chatId);
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h4">Welcome to our chat service!</Typography>
      <Typography variant="body1" align="center" mt={2}>
        Click the button below to start the chat:
      </Typography>
      <Button variant="contained" color="primary" onClick={startChat} mt={2}>
        Start Chat
      </Button>
    </Box>
  );
}

export default ChatInitiate;
