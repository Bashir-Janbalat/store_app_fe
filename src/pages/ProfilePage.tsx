import {Box, Container, Typography} from "@mui/material";
import {useLanguage} from "../hooks/useLanguage";

const ProfilePage = () => {
    const {t} = useLanguage();

    return (
        <Container maxWidth="md">
            <Box p={4}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {t.nav.profile}
                </Typography>
                <Typography variant="body1">
                    {t.nav.profile} content goes here...
                </Typography>
            </Box>
        </Container>
    );
};

export default ProfilePage;