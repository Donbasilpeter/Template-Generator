import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f9f9f9', // Match a neutral background color
        padding: '2rem',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: '5rem',
          fontWeight: 'bold',
          color: '#34312D', // Use the same primary color
          mb: 2,
        }}
      >
        404
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: '#34312D',
          textAlign: 'center',
          mb: 4,
        }}
      >
        The page you're looking for doesn't exist.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        sx={{
          textTransform: 'none',
          backgroundColor: '#34312D',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#5a544d',
          },
        }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
