import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, TextField, Alert, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { useAuth } from '../AuthContext';


function FileUpload() {
  const { token } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedFileTypes = ['text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf'];
      if (allowedFileTypes.includes(file.type)) {
        setSelectedFile(file);
      } else {
        alert('Invalid file type. Please select a text, doc, docx, or pdf file.');
        e.target.value = null; // Clear the input
      }
    }
  };

  useEffect (() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(''); // Clear the message after 1 second
      }, 5000);

      return () => clearTimeout(timer); // Clear the timer if the component is unmounted
    }
  });

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const apiUrl =  process.env.REACT_APP_API_URL + '/api/upload/';
        const formData = new FormData();
        formData.append('file', selectedFile); // Attach the selected file as 'file'
        formData.append('doc_name', selectedFile.name); // Attach the  document name as 'doc_name'

        console.log(formData);

        const response = await axios.post(apiUrl, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        // Handle the response from the server as needed
        console.log('File upload response:', response);

        // Update the message state with the response message
        setMessage(response.data.message);

        // Reset the selected file after uploading
        setSelectedFile(null);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.error('No file selected');
    }
  };

  return (
    <Box>
      <input
        type="file"
        accept=".txt, .doc, .docx, .pdf"
        style={{ display: 'none' }}
        id="file-input"
        onChange={handleFileChange}
      />
      <label htmlFor="file-input">
        <Button
          variant="outlined"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Upload File
        </Button>
      </label>
      {selectedFile && (
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="selected-file"
          label="Selected File"
          value={selectedFile.name}
          InputProps={{
            readOnly: true,
          }}
        />
      )}
      <Button
        variant="contained"
        color="primary"
        disabled={!selectedFile}
        onClick={handleUpload}
      >
        Upload
      </Button>

      {/* Display message */}
      { message && ( 
        <Alert severity="success">
          { message }
        </Alert>
      )}
    </Box>
  );
}

export default FileUpload;
