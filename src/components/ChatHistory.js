import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function ChatHistory({ chatHistory, onGoToChatClick }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Chat History
      </Typography>
      {chatHistory.map((chat, index) => (
        <Box
          key={index}
          sx={{
            marginBottom: '16px',
            padding: '8px',
            backgroundColor: '#f0f8ff', // Very light blue color
            borderRadius: '8px',
            position: 'relative',
          }}
        >
          {/* Display the conversation name on the left */}
          <Typography variant="subtitle2" color="textSecondary">
            Conversation: {typeof chat.conversationName === 'string' ? chat.conversationName : ''}
          </Typography>
          {/* Display the chat text */}
          {/* {chat.messages.map((message, messageIndex) => (
            <div key={messageIndex}>
              {message.role === 'user' ? (
                <Typography>{message.content}</Typography>
              ) : (
                <Typography variant="caption" color="textSecondary">
                  Assistant: {message.content}
                </Typography>
              )}
            </div>
          ))} */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 'auto', // Push the button to the bottom
            }}
          >
            <Button
              variant="text"
              size="small"
              onClick={() => onGoToChatClick(index)}
              sx={{
                color: '#007bff', // Appropriate color for better visibility
              }}
            >
              Go to chat
            </Button>
          </div>
        </Box>
      ))}
    </Box>
  );
}

export default ChatHistory;

