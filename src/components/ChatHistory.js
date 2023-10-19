import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Input, Delete } from '@mui/icons-material';
import { Grid, Card, CardContent, CardActions, IconButton } from '@mui/material';

function ChatHistory({ chatHistory, onGoToChatClick }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Recent Chats:
      </Typography>
      {chatHistory.map((chat) => (
        <Box
          key={chat._id}
          sx={{
            marginBottom: '16px',
            padding: '8px',
            borderRadius: '8px',
            position: 'relative',
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                {typeof chat.conversationName === 'string' ? chat.conversationName : ''}
              </Typography>

              <Typography variant="body2">
                {typeof chat.messages[0].content === 'string' ? chat.messages[0].content : ''}
              </Typography>
            </CardContent>
            <CardActions>
              <Grid container spacing={2} justifyContent="flex-end">
                <Grid item>
                  <IconButton
                    color="secondary"
                    size="small"
                    onClick={() => onGoToChatClick(chat._id)}
                  >
                    <Input />
                  </IconButton>
                  <IconButton color="error" size="small">
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Box>
      ))}
    </Box>
  );
}

export default ChatHistory;
