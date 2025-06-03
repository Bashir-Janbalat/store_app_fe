import { Container, Box, Typography } from "@mui/material";
import { useLanguage } from "../hooks/useLanguage";

const OrdersPage = () => {
    const { t } = useLanguage();

    return (
        <Container maxWidth="md">
            <Box p={4}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {t.nav.orders}
                </Typography>
                <Typography variant="body1">
                    {t.nav.orders} content goes here...
                </Typography>
            </Box>
        </Container>
    );
};

export default OrdersPage;