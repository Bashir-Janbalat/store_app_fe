import {Box, Container, Typography} from "@mui/material";
import {useLanguage} from "../hooks/useLanguage.ts";

const AboutPage = () => {
    const {t} = useLanguage();
    return (
        <Container maxWidth="md">
            <Box p={4}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {t.nav.about}
                </Typography>
                <Typography variant="body1">
                    content goes here...
                </Typography>
            </Box>
        </Container>
    );
};
export default AboutPage;