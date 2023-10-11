import React from 'react';
import axios from 'axios';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { useAuth } from '../AuthContext'; // Import your AuthContext
import ChatHistoryPage from './ChatHistoryPage';

function ChatInitiate({ onChatInitiate }) {
  const { token } = useAuth(); // Get the token from the AuthContext

  const startChat = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL + '/api/chat';
    
      const response = await axios.post(apiUrl, null, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });

      const assistantMessage = response.data.response.message;
      // console.log(response);

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
      <Container>
        <Grid container spacing={2} justifyContent="flex-end"> {/* Use Grid container */}
          <Grid item>
            <Button variant="contained" color="primary" onClick={startChat}>
              + New Chat
            </Button>
          </Grid>
        </Grid>

        {/* Include the ChatHistoryPage component below the welcome section */}
        <ChatHistoryPage />
      </Container>
    </Box>
  );
}

export default ChatInitiate;
