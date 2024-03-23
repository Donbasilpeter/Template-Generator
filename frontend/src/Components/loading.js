import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Loading = () => {

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100%"
    >
      <Typography variant="h3" gutterBottom>
        Loading
      </Typography>
    </Box>
  );
};

export default Loading;
