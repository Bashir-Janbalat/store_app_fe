import React, {useEffect, useState} from "react";
import {Box, Button, Card, CardContent, Divider, Typography,} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {useLanguage} from "../hooks/useLanguage";
import {useAuth} from "../hooks/useAuth";
import {useApiMutation} from "../hooks/useApiMutation.ts";
import {ApiType} from "../types/common.ts";
import {useFetchData} from "../hooks/useFetchData.ts";
import {useQueryToast} from "../hooks/useQueryToast.ts";
import LoadingSkeleton from "../components/common/LoadingSkeleton.tsx";
import ErrorFallback from "../components/common/ErrorFallback.tsx";
import type {OrderResponseCreatedDTO} from "../types/OrderDTO.ts";
import type {Address, AddressType} from "../types/customer.ts";
import {useCart} from "../hooks/useCart.ts";
import PaymentMethods from "../components/common/PaymentMethods.tsx";


const CheckoutPage: React.FC = () => {
    const {t} = useLanguage();
    const {user} = useAuth();
    const {cartId, items} = useCart();
    const navigate = useNavigate();
    const initialTotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const [total, setTotal] = useState<number>(initialTotal);

    useEffect(() => {
        if (!user) {
            navigate("/login?redirectUrl=/checkout");
        }
    }, [user, navigate]);

    const queryKey = 'addresses';
    const query = useFetchData<Address[]>(ApiType.STORE, queryKey, `/addresses`);
    const {data: addresses, isLoading, isError, retryWithToast} = useQueryToast(query, {showLoading: true,});

    const createOrder = useApiMutation<OrderResponseCreatedDTO, { cartId: number, customerId: number }>({
        method: 'post',
        url: '/orders',
        api: ApiType.STORE,
        sendPayload: true,
        onSuccess: (orderResponse) => {
            setTotal(orderResponse.totalAmount);
            createStripeSession.mutate({orderId: orderResponse.orderId});

        },
        onError: (err) => toast.error(t.address.createError + err.message),
    });

    const createStripeSession = useApiMutation<string, { orderId: number }>({
        method: "post",
        url: "/checkout/create-session",
        api: ApiType.STORE,
        sendPayload: false,
        buildUrlFn: (url, payload) => `${url}?orderId=${payload.orderId}`,
        onSuccess: (sessionUrl) => {
            if (sessionUrl.startsWith("http")) {
                window.location.href = sessionUrl;
            } else {
                toast.error(t.payment.invalidLink);
            }
        },
        onError: () => {
            toast.error(t.payment.sessionCreationFailed);
        },
    });

    if (isLoading) return <LoadingSkeleton/>;
    if (isError || !addresses) return <ErrorFallback onRetry={retryWithToast}/>;

    const billingAddress = addresses.find(
        (a) => a.addressType === "BILLING" && a.defaultAddress
    );
    const shippingAddress = addresses.find(
        (a) => a.addressType === "SHIPPING" && a.defaultAddress
    );
    const handleCheckout = () => {
        if (!user) {
            navigate("/login?redirectUrl=/checkout");
            return;
        }
        if (!cartId) {
            toast.error(t.cart.noCartIdError);
            return;
        }
        if (!billingAddress || !shippingAddress) {
            toast.error(t.address.mustSetDefault);
            return;
        }
        createOrder.mutate({cartId, customerId: user.id});
    };

    const renderAddress = (type: AddressType, address: Address | undefined) => (
        <Card sx={{mb: 2}}>
            <CardContent>
                <Typography variant="h6">
                    {type === "BILLING" ? t.address.type.billing : t.address.type.shipping}
                </Typography>
                {address ? (
                    <>
                        <Typography>{address.addressLine}</Typography>
                        <Typography>
                            {address.city}, {address.state} {address.postalCode}
                        </Typography>
                        <Typography>{address.country}</Typography>
                    </>
                ) : (
                    <Button variant="outlined" onClick={() => navigate("/addresses")}>
                        {type === "BILLING"
                            ? t.address.createBillingAddress
                            : t.address.createShippingAddress}
                    </Button>
                )}
            </CardContent>
        </Card>
    );


    return (
        <Box maxWidth="md" mx="auto" p={3}>
            <Typography variant="h4" gutterBottom>
                {t.checkout.title}
            </Typography>

            {renderAddress("SHIPPING", shippingAddress)}
            {renderAddress("BILLING", billingAddress)}


            <Divider sx={{my: 2}}/>

            <Typography variant="h6" gutterBottom>
                {t.cart.total}: {total !== undefined ? total.toFixed(2) : "0.00"}
            </Typography>
            <Box sx={{textAlign: "right", mt: 4}}>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={
                        createOrder.isPending || !billingAddress || !shippingAddress || items.length === 0
                    }
                    onClick={handleCheckout}
                >
                    {createOrder.isPending ? t.checkout.processingOrder : t.checkout.checkout}
                </Button>
            </Box>
            <PaymentMethods />
        </Box>
    );
};

export default CheckoutPage;
