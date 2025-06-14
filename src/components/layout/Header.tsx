import React, {useEffect, useState} from 'react';
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
import {Link, useNavigate} from 'react-router-dom';
import {
    AccountCircle,
    ExitToApp,
    FavoriteBorder,
    Language,
    Menu as MenuIcon,
    Person,
    Settings,
    ShoppingBag,
    ShoppingCart,
    Store,
    Translate,
} from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import {useLanguage} from "../../hooks/useLanguage.ts";
import {useIsMobile} from "../../hooks/useIsMobile.ts";
import {useAuth} from "../../hooks/useAuth.ts";

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
    const isMobile = useIsMobile();
    const {t, isRTL, language, toggleLanguage} = useLanguage();
    const {user, signOut} = useAuth();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        setAnchorEl(null);
    }, [user]);

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
                flex: 1,
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: isMobile ? 'flex-start' : 'center',
                alignItems: isMobile ? 'flex-start' : 'center',
                gap: 2,
                p: isMobile ? 2 : 0,
            }}
        >
            <TextField
                size="small"
                placeholder={t.common.searchPlaceholder ?? "Search..."}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                variant="outlined"
                sx={{
                    flex: 1,
                    maxWidth: 500,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    mx: 2,
                    input: {color: 'white'},
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.5)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                    },
                }}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{color: 'white'}}/>
                            </InputAdornment>
                        )
                    }
                }}
            />
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
            <AppBar position="static" sx={{bgcolor: 'primary', color: 'white'}}>
                <Toolbar sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                    {/* Left: Logo/Menu */}
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        {isMobile && (
                            <IconButton color="inherit" onClick={toggleDrawer}>
                                <MenuIcon/>
                            </IconButton>
                        )}
                        <Store/>
                        <Typography variant="h6" noWrap>
                            {t.common.storeName}
                        </Typography>
                    </Box>

                    {/* Middle: NavLinks */}
                    {!isMobile && NavLinks}

                    {/* Right: Icons */}
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                        {/* Toggle Language */}
                        <Tooltip title={language === 'ar' ? 'en' : 'ar'}>
                            <IconButton color="inherit" onClick={toggleLanguage} sx={{ml: 1}}>
                                {language === 'ar' ? <Language/> : <Translate/>}
                            </IconButton>
                        </Tooltip>
                        <IconButton color="inherit" onClick={onWishlistClick}>
                            <Badge badgeContent={wishlistItemsCount} color="error">
                                <FavoriteBorder/>
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit" onClick={onCartClick}>
                            <Badge badgeContent={cartItemsCount} color="error">
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                        {/* Auth */}
                        {user ? (
                            <>
                                <IconButton color="inherit" onClick={handleMenu}>
                                    <AccountCircle/>
                                </IconButton>
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

                                    <MenuItem component={Link} to="/wishlist" onClick={handleClose}>
                                        <ListItemIcon><FavoriteBorder fontSize="small"/></ListItemIcon>
                                        <ListItemText>{t.nav.wishlist}</ListItemText>
                                    </MenuItem>

                                    <Divider/>

                                    <MenuItem component={Link} to="/settings" onClick={handleClose}>
                                        <ListItemIcon><Settings fontSize="small"/></ListItemIcon>
                                        <ListItemText>{t.nav.settings}</ListItemText>
                                    </MenuItem>

                                    <MenuItem onClick={signOut}>
                                        <ListItemIcon><ExitToApp fontSize="small"/></ListItemIcon>
                                        <ListItemText>{t.nav.logout}</ListItemText>
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Box sx={{display: 'flex', gap: 1, ml: 2}}>
                                <Button color="inherit" onClick={() => navigate('/login')}>
                                    {t.nav.login}
                                </Button>
                                <Button color="inherit" onClick={() => navigate('/register')}>
                                    {t.nav.signup}
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Drawer for Mobile Nav */}
            {isMobile && drawerOpen && (
                <Drawer open={drawerOpen} onClose={toggleDrawer}>
                    <Box sx={{width: 250}} role="presentation" onClick={toggleDrawer}>
                        {NavLinks}
                    </Box>
                </Drawer>
            )}
        </>
    );
};

export default Header;
