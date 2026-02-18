import React, { useState } from 'react';
import { Typography, TextField, Button, Box, Link, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { useToast } from '../../context/useToast';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
    const {showToast} = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, data);
            const { user, accessToken, refreshToken } = response.data;
            dispatch(setCredentials({ user, accessToken, refreshToken }));
            navigate('/dashboard');
            showToast('Login Successful!', 'success');
        } catch (err: unknown) {
            setError(getErrorMessage(err));
            showToast('Login Failed!', 'error');
            console.error(error);
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
                Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Enter your credentials to access your surveys
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    fullWidth
                    label="Email Address"
                    margin="normal"
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    variant="filled"
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    variant="filled"
                    sx={{ mb: 3 }}
                />
                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    type="submit"
                    disabled={loading}
                    sx={{ py: 1.5, mb: 3, fontWeight: 700 }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
                </Button>
            </form>

            <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link
                    component="button"
                    onClick={() => navigate('/register')}
                    sx={{ fontWeight: 700, textDecoration: 'none' }}
                >
                    Sign Up
                </Link>
            </Typography>
        </Box>
    );
};

export default Login;
