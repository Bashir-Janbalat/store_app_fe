import React from 'react';
import {Box, Button, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useLanguage} from "../../hooks/useLanguage.ts";

const Hero: React.FC = () => {
    const navigate = useNavigate();
    const {t} = useLanguage();

    return (
        <Box
            sx={{
                bgcolor: 'primary.dark',
                color: 'white',
                py: 10,
                px: 10,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '40vh',
                backgroundImage: 'url(/hero-bg.jpeg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backdropFilter: 'brightness(0.7)',
            }}
        >
            <Typography variant="h3" component="h1"  gutterBottom sx={{fontWeight: 'bold'}}>
                {t.hero.title}
            </Typography>
            <Typography variant="h5" component="p" gutterBottom sx={{mb: 4}}>
                {t.hero.subtitle}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate('/products')}
                sx={{
                    bgcolor: 'white',
                    color: 'grey.900',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                        bgcolor: 'grey.100',
                    },
                }}
            >
                {t.hero.cta}
            </Button>
        </Box>
    );
};

export default Hero;
