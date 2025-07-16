import React, {useState} from 'react';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import {Login as LoginIcon, Store, Visibility, VisibilityOff} from '@mui/icons-material';
import {useLanguage} from "../hooks/useLanguage.ts";
import {useAuth} from "../hooks/useAuth.ts";
import {handleSetError} from "../utils/error-utils.ts";


const LoginPage = () => {
    const {t} = useLanguage();
    const {signIn} = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [searchParams] = useSearchParams();
    const redirectUrl = searchParams.get('redirectUrl') || '/';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await signIn(email, password);
            navigate(redirectUrl);
        } catch (error: unknown) {
            handleSetError(error, setError);
        } finally {
            setLoading(false);
        }
    };

    const getErrorMessage = () => {
        if (error.includes('Email not verified')) {
            return t.auth.emailNotVerified;
        }
        if (error.includes('Authentication service unavailable')) {
            return t.auth.authServiceUnavailable;
        }
        if (error.includes('Server not reachable')) {
            return t.auth.authServiceUnavailable;
        }
        if (error.includes('Invalid username or password')) {
            return t.auth.invalidCredentials;
        }
        return error;
    };

    return (
        <>
            <Container maxWidth="sm" sx={{minHeight: '100vh', display: 'flex', alignItems: 'center'}}>
                <Card sx={{width: '100%', p: 3}}>
                    <CardContent>
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3}}>
                            <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
                                <Store/>
                            </Avatar>
                            <Typography component="h1" variant="h4" sx={{mb: 1}}>
                                {t.auth.welcomeBack}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {t.common.storeName}
                            </Typography>
                        </Box>

                        {error && (
                            <Alert severity="error" sx={{mb: 2}}>
                                {getErrorMessage()} {/* استخدام دالة إرجاع رسالة الخطأ */}
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
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label={t.auth.password}
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(prev => !prev)}
                                                    edge="end"
                                                    aria-label="toggle password visibility"
                                                >
                                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                }}
                            />

                            <Box sx={{textAlign: 'right', mt: 1, mb: 2}}>
                                <Link to="/forgot-password" style={{textDecoration: 'none'}}>
                                    <Typography variant="body2" color="primary">
                                        {t.auth.forgotPassword}
                                    </Typography>
                                </Link>
                            </Box>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size={20}/> : <LoginIcon/>}
                            >
                                {loading ? '...' : t.auth.signIn}
                            </Button>

                            <Box sx={{textAlign: 'center'}}>
                                <Typography variant="body2">
                                    {t.auth.dontHaveAccount}{' '}
                                    <Link to="/register" style={{textDecoration: 'none'}}>
                                        <Typography component="span" color="primary">
                                            {t.auth.signUp}
                                        </Typography>
                                    </Link>
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
};

export default LoginPage;
