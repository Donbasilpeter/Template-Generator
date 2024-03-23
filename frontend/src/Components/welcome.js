import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const WelcomeTemplate = () => {

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100%"


    >
      <Typography variant="h3" gutterBottom>
        Welcome to Template Generator
      </Typography>
      <Typography variant="body1">
        We're thrilled to have you on board! Let's work together to create something extraordinary.
      </Typography>
    </Box>
  );
};

export default WelcomeTemplate;
