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
    </Box>
  );
};

export default WelcomeTemplate;
