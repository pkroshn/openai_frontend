import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import ChatHistory from './ChatHistory'; // Make sure to provide the correct path
import { useAuth } from '../AuthContext';

function ChatHistoryPage() {
    const { token } = useAuth(); // Get the token from the AuthContext
    const [chatHistory, setChatHistory] = useState([]);
  
    useEffect(() => {
      // Only make the API request if a token is available
      if (token) {
        axios.get('http://localhost:3001/api/chat', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        })
          .then(response => {
            setChatHistory(response.data.response.message);
          })
          .catch(error => {
            console.error('Error fetching chat history:', error);
          });
      }
    }, [token]);

  return (
    <div>
      <ChatHistory chatHistory={chatHistory} />
    </div>
  );
}

export default ChatHistoryPage;
