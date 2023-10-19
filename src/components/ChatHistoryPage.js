import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatHistory from './ChatHistory';
import { useAuth } from '../AuthContext';
import Chat from './ChatLoad';

function ChatHistoryPage() {
  const { token } = useAuth();
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);

  useEffect(() => {
    if (token) {
      axios
        .get(process.env.REACT_APP_API_URL + '/api/chat', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setChatHistory(response.data.response.message);
        })
        .catch((error) => {
          console.error('Error fetching chat history:', error);
        });
    }
  }, [token]);

  const handleGoToChat = (chatId) => {
    setSelectedChatId(chatId);
  };

  return (
    <div>
      {selectedChatId ? (
        <Chat chatId={selectedChatId} />
      ) : (
        <ChatHistory chatHistory={chatHistory} onGoToChatClick={handleGoToChat} />
      )}
    </div>
  );
}

export default ChatHistoryPage;
