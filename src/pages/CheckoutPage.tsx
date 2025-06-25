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
import type {OrderResponseCreatedDTO} from "../types/order.ts";
import type {Address, AddressType} from "../types/customer.ts";
import {useCart} from "../hooks/useCart.ts";
import PaymentMethods from "../components/common/PaymentMethods.tsx";
import {getDetailedApiError} from "../utils/error-utils.ts";


const CheckoutPage: React.FC = () => {
    const {t} = useLanguage();
    const {user} = useAuth();
    const {cartId, items} = useCart();
    const navigate = useNavigate();
    const initialTotal = items.reduce((sum, item) => {
        return item.product.totalStock > 0
            ? sum + (item.unitPrice * item.quantity)
            : sum;
    }, 0);
    const [total, setTotal] = useState<number>(initialTotal);
    const [wantInvoice, setWantInvoice] = useState<boolean | null>(null);

    useEffect(() => {
        if (!user) {
            navigate("/login?redirectUrl=/checkout");
        }
    }, [user, navigate]);

    const queryKey = 'addresses';
    const query = useFetchData<Address[]>(ApiType.STORE, queryKey, `/addresses`);
    const {data: addresses, isLoading, isError, retryWithToast} = useQueryToast(query, {showLoading: true});

    const createOrder = useApiMutation<OrderResponseCreatedDTO, { billingAddressId?: number }>({
        method: 'post',
        url: '/orders',
        api: ApiType.STORE,
        sendPayload: false,
        buildUrlFn: (url, payload) => {
            if (wantInvoice && payload.billingAddressId) {
                const params = new URLSearchParams();
                params.set("billingAddressId", payload.billingAddressId.toString());
                return `${url}?${params.toString()}`;
            }
            return url;
        },
        onSuccess: (orderResponse) => {
            setTotal(orderResponse.totalAmount);
            if (orderResponse.orderId) {
                createStripeSession.mutate({orderId: orderResponse.orderId});
            } else {
                toast.error(t.payment.sessionCreationFailed);
            }
        },
        onError: (err) => {
            const detailedApiError = getDetailedApiError(err);
            toast.error(detailedApiError.message)
        }
    });

    const createStripeSession = useApiMutation<string, { orderId: number }>({
        method: "post",
        url: "/checkout/create-session",
        api: ApiType.STORE,
        sendPayload: false,
        buildUrlFn: (url, payload) => {
            if (!payload.orderId) {
                throw new Error("Missing orderId when creating Stripe session");
            }
            const params = new URLSearchParams();
            params.set("orderId", payload.orderId.toString());
            return `${url}?${params.toString()}`;
        },
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
        if (!shippingAddress) {
            toast.error(t.address.mustSetDefault);
            return;
        }
        if (wantInvoice === true && !billingAddress) {
            toast.error(t.address.mustSetDefault);
            return;
        }
        createOrder.mutate({
            ...(wantInvoice && billingAddress ? {billingAddressId: billingAddress.id} : {})
        });
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
                        {type === "BILLING" ? t.address.createBillingAddress : t.address.createShippingAddress}
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
            {wantInvoice === null && (
                <Box display="flex" gap={2} my={2}>
                    <Typography>{t.checkout.wantInvoice}</Typography>
                    <Button variant="contained" onClick={() => setWantInvoice(true)}>
                        {t.common.yes}
                    </Button>
                    <Button variant="outlined" onClick={() => setWantInvoice(false)}>
                        {t.common.no}
                    </Button>
                </Box>
            )}
            {wantInvoice === true && renderAddress("BILLING", billingAddress)}

            <Divider sx={{my: 2}}/>

            <Typography variant="h6" gutterBottom>
                {t.cart.total}: {total !== undefined ? total.toFixed(2) : "0.00"}
            </Typography>
            <Box sx={{textAlign: "right", mt: 4}}>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={
                        createOrder.isPending || !shippingAddress || items.length === 0
                    }
                    onClick={handleCheckout}
                >
                    {createOrder.isPending ? t.checkout.processingOrder : t.checkout.checkout}
                </Button>
            </Box>
            <PaymentMethods/>
        </Box>
    );
};

export default CheckoutPage;
