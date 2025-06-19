import {Box, Grid, Paper, Typography} from "@mui/material";
import {FaAmazon, FaApple, FaCcMastercard, FaCcVisa, FaPaypal} from "react-icons/fa";
import {SiGooglepay, SiKlarna} from "react-icons/si";
import {AiOutlineLink} from "react-icons/ai";
import React from "react";
import {useLanguage} from "../../hooks/useLanguage.ts";

const paymentOptions = [
    {name: "Link", icon: <AiOutlineLink size={32} color="#4A90E2"/>},
    {name: "PayPal", icon: <FaPaypal size={32} color="#003087"/>},
    {name: "Amazon Pay", icon: <FaAmazon size={32} color="#FF9900"/>},
    {name: "Google Pay", icon: <SiGooglepay size={32} color="#4285F4"/>},
    {name: "Apple Pay", icon: <FaApple size={32} color="#000000"/>},
    {name: "Klarna", icon: <SiKlarna size={32} color="#FFB3C7"/>},
    {name: "Lastschrift", icon: null},
    {name: "Visa", icon: <FaCcVisa size={32} color="#1a1f71"/>},
    {name: "MasterCard", icon: <FaCcMastercard size={32} color="#eb001b"/>},
];

const PaymentMethods: React.FC = () => {
    const {t} = useLanguage();


    return (
        <Box mt={4} mb={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {t.payment.title}
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={2}>
                {t.payment.description}
            </Typography>

            <Grid container spacing={2}>
                {paymentOptions.map(({name, icon}) => (
                    <Grid size={{xs: 4, sm: 3, md: 2}} key={name}>
                        <Paper
                            elevation={1}
                            sx={{
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                borderRadius: 2,
                                minHeight: 100,
                                justifyContent: "center",
                                bgcolor: "#fafafa",
                            }}
                        >
                            {icon ? (
                                icon
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    {name}
                                </Typography>
                            )}
                            <Typography variant="caption" mt={1} textAlign="center" fontWeight={500}>
                                {name}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
export default PaymentMethods;