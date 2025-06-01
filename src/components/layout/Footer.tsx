import {Box, Container, Divider, Grid, IconButton, Link, Typography,} from '@mui/material';
import {Email, Facebook, Instagram, LinkedIn, LocationOn, Phone, Store, Twitter,} from '@mui/icons-material';
import {useLanguage} from "../hooks/useLanguage.ts";

const Footer = () => {
    const {t, isRTL} = useLanguage();

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: 'grey.900',
                color: 'white',
                py: 6,
                mt: 8,
                direction: isRTL ? 'rtl' : 'ltr',
            }}
        >
            <Container maxWidth="xl">
                <Grid container spacing={4}>
                    {/* معلومات الشركة */}
                    <Grid size={{xs: 12, md: 3}}>
                        <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                            <Store sx={{mr: isRTL ? 0 : 1, ml: isRTL ? 1 : 0, color: 'primary.light'}}/>
                            <Typography variant="h6" fontWeight="bold">
                                {t.common.storeName}
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="grey.300" mb={2}>
                            {t.footer.description}
                        </Typography>
                        <Box>
                            <IconButton color="inherit" size="small">
                                <Facebook/>
                            </IconButton>
                            <IconButton color="inherit" size="small">
                                <Twitter/>
                            </IconButton>
                            <IconButton color="inherit" size="small">
                                <Instagram/>
                            </IconButton>
                            <IconButton color="inherit" size="small">
                                <LinkedIn/>
                            </IconButton>
                        </Box>
                    </Grid>

                    {/* روابط سريعة */}
                    <Grid size={{xs: 12, md: 3}}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            {t.footer.quickLinks}
                        </Typography>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                            {/*{Links hier}*/}
                        </Box>
                    </Grid>

                    {/* خدمة العملاء */}
                    <Grid size={{xs: 12, md: 3}}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            {t.footer.customerService}
                        </Typography>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                            <Link href="#" color="grey.300" underline="none">
                                {t.footer.links.faq}
                            </Link>
                            <Link href="#" color="grey.300" underline="none">
                                {t.footer.links.returnPolicy}
                            </Link>
                            <Link href="#" color="grey.300" underline="none">
                                {t.footer.links.terms}
                            </Link>
                            <Link href="#" color="grey.300" underline="none">
                                {t.footer.links.privacy}
                            </Link>
                            <Link href="#" color="grey.300" underline="none">
                                {t.footer.links.shipping}
                            </Link>
                        </Box>
                    </Grid>

                    {/* معلومات التواصل */}
                    <Grid size={{xs: 12, md: 3}}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            {t.footer.contactInfo}
                        </Typography>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                <Phone color="primary"/>
                                <Typography variant="body2" color="grey.300">
                                    {t.footer.contact.phone}
                                </Typography>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                <Email color="primary"/>
                                <Typography variant="body2" color="grey.300">
                                    {t.footer.contact.email}
                                </Typography>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                <LocationOn color="primary"/>
                                <Typography variant="body2" color="grey.300">
                                    {t.footer.contact.address}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{my: 4, borderColor: 'grey.700'}}/>

                <Typography variant="body2" color="grey.400" textAlign="center">
                    {t.footer.copyright}
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;