import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/authSlice'; // Import your logout action
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const WelcomeTemplate = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to clear the Redux state
  };

  return (
    <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    minHeight="100%"
    >
      <Typography
        variant="h3"
        sx={{
          color: '#34312D', // Dark muted brownish color for the title
          mb: 2, // Margin bottom for spacing
        }}
      >
        Template Generator
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: 'center',
          color: '#000', // Default text color
          mb: 3, // Margin bottom for spacing
        }}
      >
        We're thrilled to have you on board! Let's create a React component tailored to your requirements.
      </Typography>

      {/* Logout Button */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        sx={{
          marginTop: 2,
          backgroundColor: '#34312D', // Dark brown button color
          '&:hover': {
            backgroundColor: '#2A2A24', // Lighter brown on hover
          },
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default WelcomeTemplate;
