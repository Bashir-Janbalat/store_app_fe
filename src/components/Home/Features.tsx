import {LocalShipping, Security, ShoppingBag, Support} from '@mui/icons-material';
import {useLanguage} from "../../hooks/useLanguage.ts";
import {Box, Container, Grid, Paper, Typography} from '@mui/material';

const Features = () => {
    const {t} = useLanguage();

    const features = [
        {
            icon: <ShoppingBag/>,
            title: t.features.variety.title,
            description: t.features.variety.description
        },
        {
            icon: <LocalShipping/>,
            title: t.features.shipping.title,
            description: t.features.shipping.description
        },
        {
            icon: <Security/>,
            title: t.features.payment.title,
            description: t.features.payment.description
        },
        {
            icon: <Support/>,
            title: t.features.support.title,
            description: t.features.support.description
        },
    ];
    return (
        <Container maxWidth="lg" sx={{py: 8}}>
            <Typography variant="h4" textAlign="center" gutterBottom mb={6}>
                {t.features.title}
            </Typography>
            <Grid container spacing={4}>
                {features.map((feature, index) => (
                    <Grid key={index} size={{xs: 12, sm: 6, md: 3}}>
                        <Paper sx={{
                            p: 3,
                            textAlign: 'center',
                            height: '100%',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: 3,
                            },
                        }}>
                            <Box sx={{color: 'primary.main', mb: 2, fontSize: 48}}>
                                {feature.icon}
                            </Box>
                            <Typography variant="h6" gutterBottom>
                                {feature.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {feature.description}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
export default Features;