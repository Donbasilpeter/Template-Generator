// ChatBox.js
import React, { useState } from 'react';
import { TextField, Box, InputAdornment } from '@mui/material';
import { generateComponent } from '../Services/apiService'; 
import { useDispatch,useSelector } from 'react-redux'
import { setTemplate,setIsLoading,setSessionId } from '../reducers/templateSlice';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import {  toast } from 'react-toastify';



function ChatBox() {
  const [description, setDescription] = useState('');
  const dispatch = useDispatch()
  const template = useSelector((state) => state.template.code);
  const user = useSelector((state) => state.auth.user);
  const sessionId = useSelector((state) => state.template.sessionId);


  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      dispatch(setIsLoading(true))
      await generateComponent(description,user.token,sessionId).then((template)=>{
        if(template.status===200) {
          dispatch(setTemplate(template.res.result))
          dispatch(setSessionId(template.res.sessionId))

          toast.success("Component Successfully Created")

        }
        else{
      console.log(template)

      toast.error(template.message)
        }
        dispatch(setIsLoading(false))
      });
    } catch (error) {
      toast.error(error)
        dispatch(setIsLoading(false))
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
