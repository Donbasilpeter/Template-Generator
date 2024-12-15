import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/authSlice'; // Import your logout action
import { useNavigate } from 'react-router-dom';


function TaskBar() {
  const navigate = useNavigate();



  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to clear the Redux state
    window.location.reload();
  };


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 24px',
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow
        maxWidth: "100%",
        height: '60px',
      }}
    >
      {/* Left Side: App Title */}
      <Typography
        variant="h5"
        sx={{
          color: '#34312D',
          fontWeight: 700,
          fontSize: '20px',
        }}
      >
      Web Design Generator
      </Typography>

           <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        
        sx={{
          padding: '8px 20px',
          backgroundColor: '#AF5D63', // Dark brown button color
          '&:hover': {
            backgroundColor: '#2A2A24', // Lighter brown on hover
          },
        }}
      >
        Logout
      </Button>


    </Box>
  );
}

export default TaskBar;
