import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <Box
            sx={{
                height: '100vh',
                bgcolor: 'background.default',
                color: 'text.primary',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3,
                textAlign: 'center',
            }}
        >
            <Typography variant="h1" component="h1" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
                Page Not Found
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
                The page you are looking for does not exist or has been moved.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/"
            >
                Go to Homepage
            </Button>
        </Box>
    );
};

export default NotFoundPage;