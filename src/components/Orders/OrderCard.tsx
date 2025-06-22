import React from "react";
import type {Order} from "../../types/order.ts";
import {Avatar, Box, Card, CardContent, CardHeader, Chip, Divider, Stack, Typography} from "@mui/material";
import {useLanguage} from "../../hooks/useLanguage.ts";
import { Link } from "react-router-dom";

interface OrderCardProps {
    order: Order;
}

const getStatusColor = (status: Order['status']) => {
    switch (status) {
        case 'PENDING':
            return 'warning';
        case 'PROCESSING':
            return 'info';
        case 'SHIPPED':
            return 'secondary';
        case 'DELIVERED':
            return 'success';
        case 'CANCELLED':
            return 'error';
        default:
            return 'default';
    }
};

const OrderCard: React.FC<OrderCardProps> = ({order}: OrderCardProps) => {
    const {t} = useLanguage();
    return (
        <Card sx={{mb: 2, boxShadow: 2}}>
            <CardHeader
                title={
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">
                            {t.orderCard.orderNumber} {order.id}

                        </Typography>
                        <Chip
                            label={t.orderStatus[order.status]}
                            color={getStatusColor(order.status)}
                            size="small"
                        />
                    </Box>
                }
            />
            <CardContent>
                <Typography variant="subtitle2" sx={{fontWeight: 'bold', mb: 2}}>
                    {t.orderCard.products}
                </Typography>
                <Box sx={{mb: 3}}>
                    {order.items.map((item, index) => (
                        <Box key={index} display="flex" alignItems="center" gap={2} sx={{mb: 2}}>
                            <Link to={`/products/${item.productId}`} className="item-link">
                            <Avatar
                                src={item.productInfo?.imageUrl}
                                alt={item.productInfo?.name}
                                sx={{width: 70, height: 70}}
                            >
                                {item.productInfo?.name?.charAt(0) || 'P'}
                            </Avatar>
                            </Link>
                            <Box flex={1}>
                                <Typography variant="body2" sx={{fontWeight: 'medium'}}>
                                    {item.productInfo?.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {t.orderCard.quantityPrice} {item.quantity} × {item.unitPrice.toFixed(2)}
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{fontWeight: 'bold'}}>
                                €{item.totalPrice.toFixed(2)}
                            </Typography>
                        </Box>
                    ))}
                </Box>
                <Divider sx={{my: 2}}/>
                {/* Addresses */}
                <Stack direction={{xs: 'column', md: 'row'}} spacing={2} sx={{mb: 2}}>
                    <Box flex={1}>
                        <Typography variant="subtitle2" sx={{fontWeight: 'bold', mb: 1}}>
                            {t.address.type.shipping}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                            {order.shippingAddress.addressLine}<br/>
                            {order.shippingAddress.city}, {order.shippingAddress.state}<br/>
                            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </Typography>
                    </Box>
                    <Box flex={1}>
                        {order.billingAddress &&
                            <>
                                <Typography variant="subtitle2" sx={{fontWeight: 'bold', mb: 1}}>
                                    {t.address.type.billing}
                                </Typography>
                                <Typography variant="subtitle2" color="text.secondary">
                                    {order.billingAddress.addressLine}<br/>
                                    {order.billingAddress.city}, {order.billingAddress.state}<br/>
                                    {order.billingAddress.postalCode}, {order.billingAddress.country}
                                </Typography>
                            </>
                        }
                    </Box>
                </Stack>

                <Divider sx={{my: 2}}/>

                {/* Total Amount */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                        {t.orderCard.total}
                    </Typography>
                    <Typography variant="h6" sx={{fontWeight: 'bold', color: 'primary.main'}}>
                        €{order.totalAmount.toFixed(2)}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
export default OrderCard;