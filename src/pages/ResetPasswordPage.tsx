import React, {useState} from 'react';
import {useNavigate, useSearchParams, Link} from 'react-router-dom';
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
    IconButton,
    InputAdornment,
} from '@mui/material';
import {LockReset, ArrowBack, Visibility, VisibilityOff} from '@mui/icons-material';
import {useLanguage} from '../hooks/useLanguage.ts';
import {useAuth} from '../hooks/useAuth.ts';
import {handleSetError} from '../utils/error-utils.ts';

const ResetPasswordPage = () => {
    const {t} = useLanguage();
    const {resetPasswordFor} = useAuth();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get('token') || '';

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!token) {
            setError('Invalid or missing token');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError(t.auth.passwordsDoNotMatch);
            return;
        }
        setLoading(true);

        try {
            await resetPasswordFor({token, newPassword});
            setSuccess(true);
        } catch (err) {
            handleSetError(err, setError);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <Container maxWidth="sm" sx={{minHeight: '100vh', display: 'flex', alignItems: 'center'}}>
                <Card sx={{width: '100%', p: 3}}>
                    <CardContent sx={{textAlign: 'center'}}>
                        <Avatar sx={{m: 'auto', bgcolor: 'success.main'}}>
                            <LockReset/>
                        </Avatar>
                        <Typography component="h1" variant="h5" sx={{mt: 2, mb: 2}}>
                            {t.auth.passwordResetSuccess}
                        </Typography>
                        <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
                            {t.auth.backToLogin}
                        </Button>
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
                            <LockReset/>
                        </Avatar>
                        <Typography component="h1" variant="h4" sx={{mb: 1}}>
                            {t.auth.resetPasswordTitle || 'Reset Password'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{textAlign: 'center', mb: 3}}>
                            {t.auth.resetNewPasswordDescription}
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{mb: 2}}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit}>
                        {/*بعض المتصفحات أو أدوات الوصول (مثل قارئ الشاشة أو مدير كلمات المرور) تحتاج إلى حقل اسم المستخدم حتى لو كان مخفيًا.
                         هذا يساعدها في فهم أن هذا النموذج لتغيير كلمة المرور.*/}
                        <input
                            type="text"
                            name="username"
                            autoComplete="username"
                            style={{display: 'none'}}
                            tabIndex={-1}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label={t.auth.newPassword}
                            type={showPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
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
                            id="confirmPassword"
                            label={t.auth.confirmPassword}
                            type={showConfirmPassword ? 'text' : 'password'}
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
                            startIcon={loading ? <CircularProgress size={20}/> : null}
                        >
                            {loading ? '...' : t.auth.resetPasswordButton || 'Reset Password'}
                        </Button>

                        <Box sx={{textAlign: 'center'}}>
                            <Link to="/login" style={{textDecoration: 'none'}}>
                                <Button startIcon={<ArrowBack/>} color="primary">
                                    {t.auth.backToLogin || 'Back to LoginPage'}
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ResetPasswordPage;
