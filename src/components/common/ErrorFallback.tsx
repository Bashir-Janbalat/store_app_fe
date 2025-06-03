import {Box, Typography, Button} from '@mui/material';
import {useLanguage} from "../../hooks/useLanguage.ts";

interface ErrorFallbackProps {
    message?: string;
    onRetry?: () => void;
}

const ErrorFallback = ({message, onRetry}: ErrorFallbackProps) => {
    const {t} = useLanguage();
    return (
        <Box
            sx={{
                textAlign: 'center',
                padding: 4,
                maxWidth: 400,
                margin: '3rem auto',
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: '#fff',
            }}
        >
            <img
                src="/error-workshop-broken.png"
                alt={t.error.imageAlt || "Broken workshop error image"}
                style={{width: '100%', maxWidth: 300, marginBottom: 16}}
            />
            <Typography variant="h6" gutterBottom>
                {message ?? t.error?.message ?? "Something went wrong."}
            </Typography>
            {onRetry && (
                <Button variant="contained" color="primary" onClick={onRetry}>
                    {t.error.retry || "Retry"}
                </Button>
            )}
        </Box>
    );
};

export default ErrorFallback;
