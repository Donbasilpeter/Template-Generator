// ChatBox.js
import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';
import { submitDescription } from '../Services/apiService'; 
import { useDispatch } from 'react-redux'
import { setTemplate,setIsLoading } from '../reducers/templateSlice';

function ChatBox() {
  const [description, setDescription] = useState('');
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitted description:", description);
      dispatch(setIsLoading(true))
      await submitDescription(description).then((template)=>{
        if(template) dispatch(setTemplate(template))
        dispatch(setIsLoading(false))
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
      sx={{
        mb: 2,
        flexGrow: 1,
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#34312D', // Change the border color when focused
        },
        '& .MuiInputLabel-outlined.Mui-focused': {
          color: '#34312D', // Change the label color when focused
        },
      }}
    />
    </Box>
  );
}

export default ChatBox;
