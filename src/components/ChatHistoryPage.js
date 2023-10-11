import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatHistory from './ChatHistory';
import { useAuth } from '../AuthContext';
import Chat from './Chat'; // Make sure to provide the correct path

function ChatHistoryPage() {
  const { token } = useAuth();
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null); // Track selected chat _id
  const [selectedChatData, setSelectedChatData] = useState(null); // Store chat data for selected chat

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

  // Function to handle chat selection
  const handleGoToChat = async (chatId) => {
    await fetchChatData(chatId);
  };

  // Function to fetch chat messages by chat ID
  const fetchChatData = (chatId) => {
    // Make an API request to fetch chat data by chat ID
    axios
      .get(process.env.REACT_APP_API_URL + `/api/chat/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const chatData = response.data.response.message.messages;
        console.log(chatData);
        setSelectedChatData(chatData);
        setSelectedChatId(chatId);
      })
      .catch((error) => {
        console.error('Error fetching chat data by chat ID:', error);
      });
  };

  return (
    <div>
      {selectedChatId ? (
        <Chat initialAssistantMessage={selectedChatData} chatId={selectedChatId} />
      ) : (
        <ChatHistory chatHistory={chatHistory} onGoToChatClick={handleGoToChat} />
      )}
    </div>
  );
}

export default ChatHistoryPage;
