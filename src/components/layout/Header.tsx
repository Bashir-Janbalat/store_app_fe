import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {
    AppBar,
    Badge,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    InputAdornment,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    TextField,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material';
import {
    AccountCircle,
    ExitToApp,
    FavoriteBorder,
    Home as HomeIcon,
    Language,
    Menu as MenuIcon,
    Person,
    Search as SearchIcon,
    Settings,
    ShoppingBag,
    ShoppingCart,
    Store,
    Translate,
} from '@mui/icons-material';
import {useIsMobile} from "../../hooks/useIsMobile.ts";
import {useAuth} from '../../hooks/useAuth.ts';
import {useLanguage} from '../../hooks/useLanguage.ts';

interface HeaderProps {
    cartItemsCount: number;
    wishlistItemsCount: number;
    onCartClick: () => void;
    onWishlistClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
                                           cartItemsCount,
                                           wishlistItemsCount,
                                           onCartClick,
                                           onWishlistClick,
                                       }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const isMobile = useIsMobile();
    const {t, isRTL, language, toggleLanguage} = useLanguage();
    const {user, signOut} = useAuth();
    const navigate = useNavigate();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleDrawer = () => {
        setDrawerOpen(prev => !prev);
    };

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            navigate(`/products?productName=${encodeURIComponent(searchValue)}`);
        }
    };

    const NavLinks = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center',
                gap: 2,
                p: isMobile ? 2 : 0,
            }}
        >
            {isMobile && (
                <TextField
                    size="small"
                    placeholder={t.common.searchPlaceholder}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    variant="outlined"
                    fullWidth
                    sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'rgba(0, 0, 0, 0.23)',
                            },
                            '&:hover fieldset': {
                                borderColor: 'primary.main',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'primary.main',
                            },
                        },
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            )
                        }
                    }
                    }
                />
            )}
            <Button color="inherit" component={Link} to="/">
                {t.nav.home}
            </Button>
            <Button color="inherit" component={Link} to="/products">
                {t.nav.products}
            </Button>
            <Button color="inherit" component={Link} to="/about">
                {t.nav.about}
            </Button>
            <Button color="inherit" component={Link} to="/contact">
                {t.nav.contact}
            </Button>
        </Box>
    );

    return (
        <>
            <AppBar position="sticky" sx={{backgroundColor: 'white', color: 'text.primary', boxShadow: 1}}>
                <Toolbar sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                    {/* Left: Logo/Menu */}
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        {isMobile && (
                            <IconButton
                                color="inherit"
                                onClick={toggleDrawer}
                                sx={{color: 'primary.main'}}
                            >
                                <MenuIcon/>
                            </IconButton>
                        )}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)',
                            borderRadius: 2,
                            p: 1
                        }}>
                            <Store sx={{color: 'white'}}/>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 'bold'
                            }}
                        >
                            {t.common.storeName}
                        </Typography>
                    </Box>

                    {/* Middle: Search for Desktop */}
                    {!isMobile && (
                        <Box sx={{flex: 1, maxWidth: 500, mx: 4}}>
                            <TextField
                                size="small"
                                placeholder={t.common.searchPlaceholder}
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onKeyDown={handleSearchKeyDown}
                                variant="outlined"
                                fullWidth
                                sx={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'rgba(0, 0, 0, 0.12)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'primary.main',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'primary.main',
                                        },
                                    },
                                }}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon sx={{color: 'text.secondary'}}/>
                                            </InputAdornment>
                                        )
                                    }
                                }
                                }
                            />
                        </Box>
                    )}

                    {/* Desktop Navigation */}
                    {!isMobile && (
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/"
                                sx={{color: 'text.primary', '&:hover': {color: 'primary.main'}}}
                            >
                                {t.nav.home}
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/products"
                                sx={{color: 'text.primary', '&:hover': {color: 'primary.main'}}}
                            >
                                {t.nav.products}
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/about"
                                sx={{color: 'text.primary', '&:hover': {color: 'primary.main'}}}
                            >
                                {t.nav.about}
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/contact"
                                sx={{color: 'text.primary', '&:hover': {color: 'primary.main'}}}
                            >
                                {t.nav.contact}
                            </Button>
                        </Box>
                    )}

                    {/* Right: Icons */}
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        {/* Toggle Language */}
                        <Tooltip title={language === 'ar' ? 'English' : 'العربية'}>
                            <IconButton
                                color="inherit"
                                onClick={toggleLanguage}
                                sx={{color: 'text.secondary', '&:hover': {color: 'primary.main'}}}
                            >
                                {language === 'ar' ? <Language/> : <Translate/>}
                            </IconButton>
                        </Tooltip>

                        {/* Wishlist */}
                        <Tooltip title={t.nav.wishlist}>
                            <IconButton
                                color="inherit"
                                onClick={onWishlistClick}
                                sx={{color: 'text.secondary', '&:hover': {color: 'error.main'}}}
                            >
                                <Badge badgeContent={wishlistItemsCount} color="error">
                                    <FavoriteBorder/>
                                </Badge>
                            </IconButton>
                        </Tooltip>

                        {/* Cart */}
                        <Tooltip title={t.nav.orders}>
                            <IconButton
                                color="inherit"
                                onClick={onCartClick}
                                sx={{color: 'text.secondary', '&:hover': {color: 'primary.main'}}}
                            >
                                <Badge badgeContent={cartItemsCount} color="primary">
                                    <ShoppingCart/>
                                </Badge>
                            </IconButton>
                        </Tooltip>

                        {/* Auth */}
                        {user ? (
                            <>
                                <Tooltip title={t.nav.profile}>
                                    <IconButton
                                        color="inherit"
                                        onClick={handleMenu}
                                        sx={{color: 'text.secondary', '&:hover': {color: 'primary.main'}}}
                                    >
                                        <AccountCircle/>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    sx={{mt: 1}}
                                    transformOrigin={{horizontal: isRTL ? 'left' : 'right', vertical: 'top'}}
                                    anchorOrigin={{horizontal: isRTL ? 'left' : 'right', vertical: 'bottom'}}
                                >
                                    <MenuItem component={Link} to="/profile" onClick={handleClose}>
                                        <ListItemIcon><Person fontSize="small"/></ListItemIcon>
                                        <ListItemText>{t.nav.profile}</ListItemText>
                                    </MenuItem>

                                    <MenuItem component={Link} to="/orders" onClick={handleClose}>
                                        <ListItemIcon><ShoppingBag fontSize="small"/></ListItemIcon>
                                        <ListItemText>{t.nav.orders}</ListItemText>
                                    </MenuItem>

                                    <MenuItem component={Link} to="/addresses" onClick={handleClose}>
                                        <ListItemIcon><HomeIcon fontSize="small"/></ListItemIcon>
                                        <ListItemText>{t.address.title}</ListItemText>
                                    </MenuItem>

                                    <Divider/>

                                    <MenuItem component={Link} to="/settings" onClick={handleClose}>
                                        <ListItemIcon><Settings fontSize="small"/></ListItemIcon>
                                        <ListItemText>{t.nav.settings}</ListItemText>
                                    </MenuItem>

                                    <MenuItem onClick={signOut} sx={{color: 'error.main'}}>
                                        <ListItemIcon><ExitToApp fontSize="small" color="error"/></ListItemIcon>
                                        <ListItemText>{t.nav.logout}</ListItemText>
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Box sx={{display: 'flex', gap: 1, ml: 1}}>
                                <Button
                                    color="inherit"
                                    onClick={() => navigate('/login')}
                                    sx={{color: 'text.secondary', '&:hover': {color: 'primary.main'}}}
                                >
                                    {t.nav.login}
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => navigate('/register')}
                                    sx={{
                                        background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)',
                                        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #1976D2 30%, #7B1FA2 90%)',
                                        }
                                    }}
                                >
                                    {t.nav.signup}
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Drawer for Mobile Nav */}
            <Drawer
                open={drawerOpen}
                onClose={toggleDrawer}
                anchor={isRTL ? 'right' : 'left'}
            >
                <Box sx={{width: 280}} role="presentation" onClick={toggleDrawer}>
                    {NavLinks}
                </Box>
            </Drawer>
        </>
    );
};

export default Header;