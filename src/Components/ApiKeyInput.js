import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setIsChatbox } from '../reducers/chatboxSlice';
import { setIsApiKey } from '../reducers/apiSlice'; 

export default function ApiKeyInput() {
  const [apiKey, setApiKey] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();


  const handleInputChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = window.electronAPI.saveApiKey(apiKey)
    if(res){
    dispatch(setIsApiKey(true));
    dispatch(setIsChatbox(true));
    } else {
      setMessage('Please enter a valid API key.');
    }
  };

  return (
    <div style={{ fontFamily: '"Roboto", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif', color: '#ddd', padding: '0 20px', background: 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)', minHeight: '100vh', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#333', borderRadius: '15px', padding: '40px', boxShadow: '0 5px 15px rgba(0,0,0,0.3)', width: '100%', maxWidth: '400px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        <label htmlFor='api-key' style={{ color: '#fff', fontSize: '1.2em', marginBottom: '10px' }}>Enter your API Key:</label>
        <input 
          type='text' 
          id='api-key' 
          value={apiKey} 
          onChange={handleInputChange} 
          placeholder='Your API Key' 
          style={{ padding: '10px', fontSize: '1em', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '20px' }} 
        />
        <button 
          type='submit' 
          style={{ backgroundColor: '#4ca1af', color: '#fff', border: 'none', borderRadius: '50px', padding: '10px 20px', fontSize: '1.1em', cursor: 'pointer', transition: 'background-color 0.3s', fontWeight: 'bold' }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3b6978'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4ca1af'}
        >
          Submit
        </button>
      </form>
      {message && <p style={{ color: '#fff', marginTop: '20px' }}>{message}</p>}
      
      <style jsx="true">{`
        @media (max-width: 768px) {
          form {
            padding: 20px;
          }
          label {
            font-size: 1em;
          }
          input {
            font-size: 0.9em;
          }
          button {
            font-size: 1em;
          }
        }

        @media (max-width: 480px) {
          form {
            padding: 10px;
          }
          label {
            font-size: 0.9em;
          }
          input {
            font-size: 0.8em;
          }
          button {
            font-size: 0.9em;
          }
        }
      `}</style>
    </div>
  );
}
