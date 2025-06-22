import {Box, Container} from "@mui/material";
import OrdersList from "../components/Orders/OrdersList.tsx";

const OrdersPage = () => {
    return (
        <Container maxWidth="md">
            <Box p={4}>
                <OrdersList/>
            </Box>
        </Container>
    );
};

export default OrdersPage;