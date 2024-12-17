// src/components/CreateAccount.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, TextField, Typography, Card, CardContent } from '@mui/material';
import { createAccountApi,loginApi } from '../Services/authService'; // Assume you have an API function for creating accounts
import { login } from '../reducers/authSlice';
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const CreateAccount = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleCreateAccount = (e) => {
        
        e.preventDefault();
        let isValid = true;

        // Email validation
        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Email is not valid');
            isValid = false;
        } else {
            setEmailError('');
        }

        // Password validation
        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            isValid = false;
        } else {
            setPasswordError('');
        }

        // Confirm Password validation
        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            isValid = false;
        } else {
            setConfirmPasswordError('');
        }

        if (isValid) {
            createAccountApi(email, password).then((res) => {
                console.log(res)
                if (res.status===201) {
                    toast.success(res.message)
                    loginApi(email, password).then((res) => {
                        if (res.status===200) {
                            const user = { email, token:res.token };
                            dispatch(login(user));
                            navigate("/session")
                            toast.success("Successfully Logged In")
                        }
                        else{
                            console.log(res)
                            toast.error(res?.message)
                        }
        
                    });
                }
                else{
                    toast.error(res?.message)
                }

              
            }).catch((error) => {
                alert('Error creating account');
            });
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            sx={{
                backgroundColor: '#F7F7F7', // Light background for a soft look
            }}
        >
            <Card
                sx={{
                    maxWidth: 400,
                    width: '100%',
                    padding: 3,
                    boxShadow: 3, // Added a subtle shadow to the card for a 3D effect
                    borderRadius: 3,
                    backgroundColor: '#FFFFFF', // White background for the card
                }}
            >
                <CardContent>
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{
                            color: '#34312D', // Matching the theme color for professionalism
                            fontWeight: 'bold',
                        }}
                    >
                        Create Account
                    </Typography>
                    <form onSubmit={handleCreateAccount}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            error={!!emailError}
                            helperText={emailError}
                            sx={{
                                mb: 2,
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#34312D',
                                },
                                '& .MuiInputLabel-outlined.Mui-focused': {
                                    color: '#34312D',
                                },
                            }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            error={!!passwordError}
                            helperText={passwordError}
                            sx={{
                                mb: 2,
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#34312D',
                                },
                                '& .MuiInputLabel-outlined.Mui-focused': {
                                    color: '#34312D',
                                },
                            }}
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            error={!!confirmPasswordError}
                            helperText={confirmPasswordError}
                            sx={{
                                mb: 2,
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#34312D',
                                },
                                '& .MuiInputLabel-outlined.Mui-focused': {
                                    color: '#34312D',
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            sx={{
                                mt: 2,
                                backgroundColor: '#AF5D63', // Matching theme color for button
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#2A2A24', // Darker shade on hover
                                },
                                padding: '12px 0',
                                textTransform: 'none', // Prevent uppercase text for a more modern feel
                            }}
                        >
                            Create Account
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default CreateAccount;
