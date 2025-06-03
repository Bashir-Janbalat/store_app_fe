import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
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
    Typography
} from '@mui/material';
import {PersonAdd, Store, Visibility, VisibilityOff} from '@mui/icons-material';
import {useAuth} from '../hooks/useAuth.ts';
import {useLanguage} from "../hooks/useLanguage.ts";
import {handleSetError} from "../utils/error-utils.ts";

const RegisterPage = () => {
    const {t} = useLanguage();
    const {signUp} = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError(t.auth.passwordsDoNotMatch);
            return;
        }

        setLoading(true);
        setError('');

        try {
            await signUp({name, email, password});
            navigate('/');
        } catch (error) {
            handleSetError(error, setError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{minHeight: '100vh', display: 'flex', alignItems: 'center'}}>
            <Card sx={{width: '100%', p: 3}}>
                <CardContent>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3}}>
                        <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
                            <Store/>
                        </Avatar>
                        <Typography component="h1" variant="h4" sx={{mb: 1}}>
                            {t.auth.createAccount}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {t.auth.createAccountDescription}
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
                            id="name"
                            label={t.auth.name}
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={loading}

                        />

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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            autoComplete="new-password"
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label={t.auth.confirmPassword}
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={loading}
                            autoComplete="new-password"
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowConfirmPassword(prev => !prev)}
                                                edge="end"
                                                aria-label="toggle confirm password visibilit"
                                            >
                                                {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={20}/> : <PersonAdd/>}
                        >
                            {loading ? '...' : t.auth.createAccount}
                        </Button>

                        <Box sx={{textAlign: 'center'}}>
                            <Typography variant="body2">
                                {t.auth.alreadyHaveAccount}{' '}
                                <Link to="/login" style={{textDecoration: 'none'}}>
                                    <Typography component="span" color="primary">
                                        {t.auth.signIn}
                                    </Typography>
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default RegisterPage;