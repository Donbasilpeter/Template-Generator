import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FaSpinner } from 'react-icons/fa'; // Importing an icon from react-icons library

const Loading = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prevRotation) => (prevRotation + 30) % 360); // Increment rotation angle
    }, 100); // Adjust the interval duration for desired spinning speed

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100%"
    >
      <Typography variant="body1" mt={2}>Loading...</Typography> {/* Text indicating loading */}
      <FaSpinner style={{ fontSize: 50, marginTop: 20, transform: `rotate(${rotation}deg)` }} /> {/* Using an icon */}
    </Box>
  );
};

export default Loading;
