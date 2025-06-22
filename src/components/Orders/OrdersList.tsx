import React, {useEffect, useState} from "react";
import {useLanguage} from "../../hooks/useLanguage.ts";
import {useFetchData} from "../../hooks/useFetchData.ts";
import {ApiType} from "../../types/common.ts";
import {useQueryToast} from "../../hooks/useQueryToast.ts";
import LoadingSkeleton from "../common/LoadingSkeleton.tsx";
import ErrorFallback from "../common/ErrorFallback.tsx";
import type {Order} from "../../types/order.ts";
import {
    Box,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    type SelectChangeEvent,
    Typography
} from "@mui/material";
import OrderCard from "./OrderCard.tsx";

const queryKey = 'orders';

const OrdersList: React.FC = () => {
    const {t} = useLanguage();
    const [orderStatus, setOrderStatus] = useState<Order['status']>('PENDING');
    const [orders, setOrders] = useState<Order[]>([]);


    const query =
        useFetchData<Order[], { status: Order['status'] }>(ApiType.STORE, queryKey, `/orders`, {status: orderStatus});
    const {data, isLoading, isError, retryWithToast} = useQueryToast(query, {showLoading: true});

    useEffect(() => {
        if (data)
            setOrders(data);
    }, [data]);

    if (isLoading) return <LoadingSkeleton/>;
    if (isError) return <ErrorFallback onRetry={retryWithToast}/>;

    const handleStatusChange = (event: SelectChangeEvent) => {
        setOrderStatus(event.target.value as Order['status']);
    };
    return (<>
        <Container maxWidth="md">
            <Paper sx={{boxShadow: 1}}>
                <Typography variant="h4" component="h1" align="center" sx={{mb: 3, fontWeight: 'bold'}}>
                    {t.ordersList.title}
                </Typography>

                <Box sx={{mb: 3}}>
                    <FormControl fullWidth>
                        <InputLabel id="order-status-label">{t.ordersList.statusLabel}</InputLabel>
                        <Select
                            labelId="order-status-label"
                            value={orderStatus}
                            label={t.ordersList.statusLabel}
                            onChange={handleStatusChange}
                        >
                            <MenuItem value="PENDING">{t.orderStatus.PENDING}</MenuItem>
                            <MenuItem value="PROCESSING">{t.orderStatus.PROCESSING}</MenuItem>
                            <MenuItem value="SHIPPED">{t.orderStatus.SHIPPED}</MenuItem>
                            <MenuItem value="DELIVERED">{t.orderStatus.DELIVERED}</MenuItem>
                            <MenuItem value="CANCELLED">{t.orderStatus.CANCELLED}</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {orders && orders.length === 0 ? (
                    <Box textAlign="center" py={4}>
                        <Typography color="text.secondary">
                            {t.ordersList.noOrders}
                        </Typography>
                    </Box>
                ) : (
                    <Box>
                        {orders && orders.map((order, index) => (
                            <OrderCard key={index} order={order}/>
                        ))}
                    </Box>
                )}
            </Paper>
        </Container>
    </>);
};
export default OrdersList;