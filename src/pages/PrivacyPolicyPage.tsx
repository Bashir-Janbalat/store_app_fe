import React from 'react';
import {useLanguage} from "../hooks/useLanguage.ts";
import {Box, Container, Typography} from '@mui/material';

const PrivacyPolicyPage: React.FC = () => {
    const {t} = useLanguage();
    return (
        <Container maxWidth="md">
            <Box p={4}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {t.footer.links.privacy}
                </Typography>
                <Typography variant="body1">
                    {t.footer.description} - Privacy policy content goes here...
                </Typography>
            </Box>
        </Container>
    );
};

export default PrivacyPolicyPage;