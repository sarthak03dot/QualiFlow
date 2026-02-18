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

const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
    const {showToast} = useToast()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormValues) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
                name: data.name,
                email: data.email,
                password: data.password,
            });
            const { user, accessToken, refreshToken } = response.data;
            dispatch(setCredentials({ user, accessToken, refreshToken }));
            navigate('/dashboard');
            showToast('Registration Successful!', 'success');
        } catch (err: unknown) {
            setError(getErrorMessage(err));
            showToast('Registration Failed!','error');
            console.error(error);
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
                Create Account
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Join us and start building complex survey flows
            </Typography>

        

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    fullWidth
                    label="Full Name"
                    margin="normal"
                    {...register('name')}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    variant="filled"
                    sx={{ mb: 2 }}
                />
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
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    margin="normal"
                    {...register('confirmPassword')}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
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
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                </Button>
            </form>

            <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link
                    component="button"
                    onClick={() => navigate('/login')}
                    sx={{ fontWeight: 700, textDecoration: 'none' }}
                >
                    Log In
                </Link>
            </Typography>
        </Box>
    );
};

export default Register;
