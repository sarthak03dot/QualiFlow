import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            }}
        >
            <Container maxWidth="sm">
                <Box
                    sx={{
                        p: 4,
                        borderRadius: 4,
                        bgcolor: 'rgba(30, 41, 59, 0.7)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <Outlet />
                </Box>
            </Container>
        </Box>
    );
};

export default PublicLayout;
