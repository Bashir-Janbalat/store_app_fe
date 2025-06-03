import {Box, Container, Typography} from "@mui/material";
import {useLanguage} from "../hooks/useLanguage.ts";

const ContactPage = () => {
    const {t} = useLanguage();
    return (
        <Container maxWidth="md">
            <Box p={4}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {t.footer.contactInfo}
                </Typography>
                <Typography variant="body1">
                    content goes here...
                </Typography>
            </Box>
        </Container>
    );
};
export default ContactPage;