import React, {useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Alert, Box, Button, Card, CardContent, CircularProgress, TextField, Typography,} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import storeApi from "../api/storeApi.ts";
import {AxiosError} from "axios";

const EmailVerificationPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const status = searchParams.get("status");
    const navigate = useNavigate();
    const isSuccess = status === "success";

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

    const handleResend = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setFeedback(null);
        try {
            await storeApi.post("/auth/resend-verification-link", null, {params: {email}});
            setFeedback({type: "success", msg: "Verification email resent. Please check your inbox."});
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            setFeedback({
                type: "error",
                msg: error?.response?.data?.message || "Failed to resend verification email.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            minHeight="80vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="#f5f6fa"
        >
            <Card sx={{xs: 12, md: 6}}>
                <CardContent sx={{textAlign: "center"}}>
                    {isSuccess ? (
                        <>
                            <CheckCircleIcon color="success" sx={{fontSize: 64}}/>
                            <Typography variant="h5" mt={2} mb={1}>
                                Email Verified!
                            </Typography>
                            <Typography color="text.secondary" mb={2}>
                                Your email address has been successfully verified. You can now log in to your account.
                            </Typography>
                            <Button variant="contained" color="primary" onClick={() => navigate("/login")}>
                                Go to Login
                            </Button>
                        </>
                    ) : (
                        <>
                            <ErrorOutlineIcon color="error" sx={{fontSize: 64}}/>
                            <Typography variant="h5" mt={2} mb={1}>
                                Verification Failed
                            </Typography>
                            <Typography color="text.secondary" mb={2}>
                                The verification link is invalid or expired.<br/>
                                Please request a new verification email.
                            </Typography>
                            <Box mt={3}>
                                <form onSubmit={handleResend}>
                                    <TextField
                                        label="Email address"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        fullWidth
                                        sx={{mb: 2}}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={loading}
                                        fullWidth
                                        startIcon={loading && <CircularProgress size={18}/>}
                                    >
                                        Resend Verification Email
                                    </Button>
                                </form>
                                {feedback && (
                                    <Alert
                                        severity={feedback.type}
                                        sx={{mt: 2}}
                                    >
                                        {feedback.msg}
                                    </Alert>
                                )}
                            </Box>
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default EmailVerificationPage;
