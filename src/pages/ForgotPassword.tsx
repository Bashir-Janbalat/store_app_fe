import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Alert,
    Container,
    Avatar,
    CircularProgress,
} from '@mui/material';
import {Store, ArrowBack, Mail, Send} from '@mui/icons-material';
import {useLanguage} from "../hooks/useLanguage.ts";
import {useAuth} from "../hooks/useAuth.ts";
import {handleSetError} from "../utils/error-utils.ts";

const ForgotPassword = () => {
    const {t} = useLanguage();
    const {sendResetLinkFor} = useAuth();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const status = await sendResetLinkFor(email);
            setEmailSent(status === 200);
        } catch (error) {
            handleSetError(error, setError);
        } finally {
            setLoading(false);
        }
    };

    if (emailSent) {
        return (
            <Container maxWidth="sm" sx={{minHeight: '100vh', display: 'flex', alignItems: 'center'}}>
                <Card sx={{width: '100%', p: 3}}>
                    <CardContent>
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3}}>
                            <Avatar sx={{m: 1, bgcolor: 'success.main'}}>
                                <Mail/>
                            </Avatar>
                            <Typography component="h1" variant="h4" sx={{mb: 1}}>
                                {t.auth.checkEmailTitle}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{textAlign: 'center'}}>
                                {t.auth.checkEmailDescription}
                            </Typography>
                        </Box>

                        <Box sx={{textAlign: 'center'}}>
                            <Link to="/login" style={{textDecoration: 'none'}}>
                                <Button startIcon={<ArrowBack/>} color="primary">
                                    {t.auth.backToLogin}
                                </Button>
                            </Link>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{minHeight: '100vh', display: 'flex', alignItems: 'center'}}>
            <Card sx={{width: '100%', p: 3}}>
                <CardContent>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3}}>
                        <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
                            <Store/>
                        </Avatar>
                        <Typography component="h1" variant="h4" sx={{mb: 1}}>
                            {t.auth.resetPasswordTitle}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{textAlign: 'center'}}>
                            {t.auth.resetPasswordDescription}
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{mb: 2}}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label={t.auth.email}
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={20}/> : <Send/>}
                        >
                            {loading ? '...' : t.auth.sendResetEmail}
                        </Button>

                        <Box sx={{textAlign: 'center'}}>
                            <Link to="/login" style={{textDecoration: 'none'}}>
                                <Button startIcon={<ArrowBack/>} color="primary">
                                    {t.auth.backToLogin}
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ForgotPassword;