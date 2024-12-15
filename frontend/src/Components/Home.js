import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const Home = () => {
  return (
    <div
      style={{
        backgroundSize: 'cover', // Ensures the image covers the entire screen
        backgroundPosition: 'center', // Centers the image
 display: 'flex', flexDirection: 'column', height: '100vh'
      }}
    >

      <Box
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          color="#FFFFFF" // Change color to make the text stand out against the background
          textAlign="center"
          sx={{ mb: 3 }}
        >
          Welcome to the Web Design Generator
        </Typography>

        <Typography
          variant="h6"
          color="#FFFFFF" // Change color for better contrast
          textAlign="center"
          sx={{ mb: 4 }}
        >
          Create stunning web designs by simply providing prompts! Generate React components, 
          save your progress, and download your designs.
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#AF5D63',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#C26E74',
            },
            borderRadius: 2,
            boxShadow: 3,
          }}
          href="/create"
        >
          Start Creating
        </Button>
      </Box>
    </div>
  );
};

export default Home;
