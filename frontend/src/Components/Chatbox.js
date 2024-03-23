// ChatBox.js
import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';
import { submitDescription } from '../Services/apiService'; 
import { useDispatch } from 'react-redux'
import { setTemplate } from '../reducers/templateSlice';

function ChatBox() {
  const [description, setDescription] = useState('');
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitted description:", description);

      await submitDescription(description).then((template)=>{
        if(template) dispatch(setTemplate(template))
      });
    } catch (error) {
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        m: 2,
        p: 2,
        maxWidth: "80%",
        margin: 'auto',
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        value={description}
        onChange={handleChange}
        onKeyDown={handleKeyDown} // Call handleSubmit on Enter
        label="Enter your description here..."
        sx={{ mb: 2, flexGrow: 1 }}
      />
    </Box>
  );
}

export default ChatBox;
