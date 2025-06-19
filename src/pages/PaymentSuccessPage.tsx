import {Link, useSearchParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useLanguage } from "../hooks/useLanguage";

const PaymentSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const { t } = useLanguage();

    return (
        <Box textAlign="center" mt={10}>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80 }} />
            <Typography variant="h4" gutterBottom>
                {t.payment.successTitle}
            </Typography>
            <Typography variant="body1">
                {sessionId
                    ? t.payment.successWithSession.replace('{{sessionId}}', sessionId)
                    : t.payment.successMessage }
            </Typography>
            <Button
                component={Link}
                to="/"
                variant="contained"
                sx={{ mt: 4 }}
            >
                {t.common.goHome}
            </Button>
        </Box>
    );
};

export default PaymentSuccessPage;