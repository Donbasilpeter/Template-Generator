// ChatBox.js
import React, { useState } from 'react';
import { TextField, Box, InputAdornment } from '@mui/material';
import { submitDescription } from '../Services/apiService'; 
import { useDispatch,useSelector } from 'react-redux'
import { setTemplate,setIsLoading } from '../reducers/templateSlice';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';


function ChatBox() {
  const [description, setDescription] = useState('');
  const dispatch = useDispatch()
  const template = useSelector((state) => state.template.code);

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
        window.electronAPI.saveFile(template);
        window.electronAPI.onFileSaved((message) => {
          if (message === 'success') {
              alert('File has been saved successfully!');
          } else {
              alert('Failed to save file.');
          }
      });
      });
    } catch (error) {
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

    // Function to generate JavaScript file content
    const generateJSFileContent = () => {
      // Example JavaScript code
      const jsContent = `
      import React from 'react';
      function Template() {
        return (
          ${template}
          );
        }

      export default Template; 
      `;
      return jsContent;
    };

  // Function to trigger JavaScript file download
  const downloadJSFile = () => {
    const jsContent = generateJSFileContent();
    const element = document.createElement("a");
    const file = new Blob([jsContent], { type: 'text/javascript' });
    element.href = URL.createObjectURL(file);
    element.download = "template.js";
    document.body.appendChild(element); // Required for Firefox
    element.click();
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
          '& .download-icon': {
            cursor: 'pointer', // Show pointer cursor on hover
          },
        }}
        InputProps={{
          endAdornment: 
          template? (
            <InputAdornment position="end">
              <DownloadForOfflineIcon  className="download-icon" onClick={downloadJSFile}/>
            </InputAdornment>
          ) : null,
        }}
      />
    </Box>
  );
}

export default ChatBox;
