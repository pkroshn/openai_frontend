import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';

export const mainListItems = ({ handleMenuClick }) => (
  <React.Fragment>
    <ListItemButton onClick={() => handleMenuClick('chat')}>
      <ListItemIcon>
        <ChatBubbleOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Chat" />
    </ListItemButton>
    <ListItemButton onClick={() => handleMenuClick('history')}>
      <ListItemIcon>
        <SpeakerNotesIcon />
      </ListItemIcon>
      <ListItemText primary="Chat History" />
    </ListItemButton>
    <ListItemButton onClick={() => handleMenuClick('fileupload')}>
        <ListItemIcon>
            <CloudUploadIcon/>            
        </ListItemIcon>
        <ListItemText primary="File Upload" />
    </ListItemButton>
    {/* <ListItemButton>
        <ListItemIcon>
            <ModelTrainingIcon/>            
        </ListItemIcon>
        <ListItemText primary="Models" />
    </ListItemButton> */}
  </React.Fragment>
);