import {Box, Button, Typography} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import {useLanguage} from "../hooks/useLanguage.ts";
import {Link, useSearchParams} from "react-router-dom";
import {useApiMutation} from "../hooks/useApiMutation.ts";
import {ApiType} from "../types/common.ts";
import {toast} from "react-hot-toast";
import {useEffect} from "react";


const PaymentCancelPage = () => {
    const {t} = useLanguage();
    const [searchParams] = useSearchParams();
    const orderId = Number(searchParams.get("orderId"));


    const cancelOrder = useApiMutation<string, { orderId: number }>({
        method: "post",
        url: `/orders`,
        api: ApiType.STORE,
        sendPayload: false,
        buildUrlFn: (url, payload) => `${url}/${payload.orderId}/cancel`,
        onSuccess: () => toast.success(t.payment.cancelSuccess),
        onError: () => toast.error(t.payment.cancelError),
    });

    useEffect(() => {
        if (orderId) {
            cancelOrder.mutate({orderId: orderId});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderId]);

    return (
        <Box textAlign="center" mt={10}>
            <CancelIcon color="error" sx={{fontSize: 80}}/>
            <Typography variant="h4" gutterBottom color="error">
                {t.payment.cancelTitle}
            </Typography>
            <Typography variant="body1">
                {t.payment.cancelMessage}
            </Typography>
            <Button
                component={Link}
                to="/cart"
                variant="outlined"
                sx={{mt: 4}}
            >
                {t.common.backToCart}
            </Button>
        </Box>
    );
};

export default PaymentCancelPage;
