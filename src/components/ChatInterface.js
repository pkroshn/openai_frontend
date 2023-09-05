import React, { useState } from 'react';
import { Box } from '@mui/material';
import Chat from './Chat'; // Import your Chat component
import ChatInitiate from './InitiateChat'; // Import your ChatInitiate component

function ChatInterface() {
    const [isChatInitiated, setIsChatInitiated] = useState(false);
    const [assistantMessage, setAssistantMessage] = useState('');
    const [chatId, setChatId] = useState('');
  
    const handleChatInitiate = (initialMessage, chatId) => {
        setIsChatInitiated(true);
        setAssistantMessage(initialMessage);
        setChatId(chatId);
    };
  
    return (
      <Box display="flex" flexDirection="column" height="100%" bgcolor="background.default">
            {isChatInitiated ? (
                <Chat initialAssistantMessage={assistantMessage} chatId={chatId} />
            ) : (
                <ChatInitiate onChatInitiate={handleChatInitiate} />
            )}
      </Box>
    );
}

export default ChatInterface;
  
