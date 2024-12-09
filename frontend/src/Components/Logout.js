import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/authSlice';
import { Box, Button, Typography } from '@mui/material';

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ padding: 2 }}
    >
      <Typography variant="h4" gutterBottom>
        You are logged in!
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Logout;
