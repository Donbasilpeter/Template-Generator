import React, { useState } from 'react';
import { TextField, Box, InputAdornment, Button } from '@mui/material';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { useDispatch, useSelector } from 'react-redux';
import { setTemplate, setIsLoading, clearTemplate } from '../reducers/templateSlice';
import { submitDescription } from '../Services/apiService';

function ChatBox() {
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const template = useSelector((state) => state.template.code);

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    dispatch(setIsLoading(true));
    try {
      const receivedTemplate = await submitDescription(description, template);
      if (receivedTemplate) {
        dispatch(setTemplate(receivedTemplate));
        window.electronAPI.saveFile(receivedTemplate);
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const downloadJSFile = () => {
    const element = document.createElement("a");
    const file = new Blob([template], { type: 'text/javascript' });
    element.href = URL.createObjectURL(file);
    element.download = "template.js";
    document.body.appendChild(element);
    element.click();
  };

  const clearTemplateHandler = () => {
    dispatch(clearTemplate());
  };

  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        m: 2,
        p: 2,
        maxWidth: "80%",
        margin: 'auto',
      }}>
      <TextField
        fullWidth
        variant="outlined"
        value={description}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        label="Enter your description here..."
        sx={{
          mb: 2,
          flexGrow: 1,
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#34312D',
          },
          '& .MuiInputLabel-outlined.Mui-focused': {
            color: '#34312D',
          },
        }}
        InputProps={{
          endAdornment: template ? (
            <InputAdornment position="end">
              <DownloadForOfflineIcon className="download-icon" onClick={downloadJSFile}/>
              <Button onClick={clearTemplateHandler} sx={{ ml: 1, color: 'white', bgcolor: '#34312D', '&:hover': { bgcolor: '#2b2a29' } }}>Clear</Button>
            </InputAdornment>
          ) : null,
        }}
      />
    </Box>
  );
}

export default ChatBox;
