import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/authSlice';
import { Box, Button, TextField, Typography, Card, CardContent } from '@mui/material';
import { loginApi } from '../Services/authService';
import { Link } from 'react-router-dom';
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        let isValid = true;

        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Email is not valid');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (isValid) {
            loginApi(email, password).then((res) => {
                if (res.status===200) {
                    const user = { email, token:res.token };
                    dispatch(login(user));
                    navigate("/create")
                    toast.success("Successfully Logged In")
                }
                else{
                    console.log(res)
                    toast.error(res?.message)
                }

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
                backgroundColor: '#F7F7F7',
            }}
        >
            <Card
                sx={{
                    maxWidth: 400,
                    width: '90%', // Adjust for smaller screens
                    padding: 3,
                    boxShadow: 3,
                    borderRadius: 3,
                    backgroundColor: '#FFFFFF',
                }}
            >
                <CardContent>
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{
                            color: '#34312D',
                            fontWeight: 'bold',
                        }}
                    >
                        Login
                    </Typography>
                    <form onSubmit={handleLogin}>
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
                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            sx={{
                                mt: 2,
                                backgroundColor: '#AF5D63',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#2A2A24',
                                },
                                padding: '12px 0',
                                textTransform: 'none',
                            }}
                        >
                            Login
                        </Button>
                    </form>
                    <Box
                        display="flex"
                        justifyContent="center"
                        mt={2}
                        sx={{
                            fontSize: '14px',
                        }}
                    >
                        <Typography>
                            Don't have an account?{' '}
                            <Link to="/create" style={{ color: '#AF5D63', fontWeight: 'bold' }}>
                                Sign up
                            </Link>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;
