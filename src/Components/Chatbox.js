import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTemplate, setIsLoading, clearTemplate } from '../reducers/templateSlice';
import { submitDescription } from '../Services/apiService';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { setIsChatbox,setDescription, clearDescription } from '../reducers/chatboxSlice';


function ChatBox() {
  const [description, setCurrentDescription] = useState('');
  const dispatch = useDispatch();
  const template = useSelector((state) => state.template.code);
  const pastDescriptions = useSelector((state) => state.chatbox.description);


  const handleChange = (event) => {
    setCurrentDescription(event.target.value);
  };

  const handleSubmit = async () => {
    dispatch(setIsLoading(true));
    try {
      const receivedTemplate = await submitDescription(pastDescriptions,description, template);
      dispatch(setDescription(description))
      if (receivedTemplate) {
        dispatch(setTemplate(receivedTemplate));
        const response = await window.electronAPI.saveFile(receivedTemplate);
        console.log(response)
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
    dispatch(setIsChatbox(false));
    dispatch(clearDescription())
    
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#333',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxSizing: 'border-box'
    }}>
      <h3 style={{ fontSize: '1.4em', color: '#fff', marginBottom: '10px' }}>What should I create</h3>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <textarea
          placeholder="Enter your description here..."
          value={description}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          style={{
            width: '70%',
            padding: '10px',
            borderRadius: '10px',
            border: '1px solid #444',
            marginBottom: '10px',
            fontSize: '1em',
            backgroundColor: '#444',
            color: '#fff',
            boxSizing: 'border-box'
          }}
        />
        {template && (
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
            <DownloadForOfflineIcon
              onClick={downloadJSFile}
              style={{
                color: '#fff',
                fontSize: '2em',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            />
            <button style={{
              backgroundColor: '#4ca1af',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              padding: '10px 20px',
              fontSize: '1em',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              fontWeight: 'bold'
              
            }}
              onClick={clearTemplateHandler}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2b2a29'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#34312D'}
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatBox;
