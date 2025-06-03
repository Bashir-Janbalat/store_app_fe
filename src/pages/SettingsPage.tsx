import { Container, Box, Typography } from "@mui/material";
import { useLanguage } from "../hooks/useLanguage";

const SettingsPage = () => {
    const { t } = useLanguage();

    return (
        <Container maxWidth="md">
            <Box p={4}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {t.nav.settings}
                </Typography>
                <Typography variant="body1">
                    {t.nav.settings} content goes here...
                </Typography>
            </Box>
        </Container>
    );
};

export default SettingsPage;