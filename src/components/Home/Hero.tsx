import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';

const Hero = () => {
    const {t} = useLanguage();
    return (
        <Box
            sx={{
                minHeight: '55vh',
                background: 'linear-gradient(to right, #2196F3 30%, #9C27B0 90%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                py: 6,
                overflow: 'hidden',
            }}
        >
            <Container>
                <Box
                    sx={{
                        animation: 'slideFade 1s ease-out forwards',
                        '@keyframes slideFade': {
                            '0%': { opacity: 0, transform: 'translateY(20px)' },
                            '100%': { opacity: 1, transform: 'translateY(0)' },
                        },
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                        {t.hero.title}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        {t.hero.subtitle}
                    </Typography>
                    <Button
                        component={Link}
                        to="/products"
                        variant="contained"
                        size="large"
                        sx={{
                            backgroundColor: 'white',
                            color: '#9C27B0',
                            fontWeight: 'bold',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                backgroundColor: '#f5f5f5',
                            },
                        }}
                    >
                        {t.hero.cta}
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Hero;
