import React, {useEffect, useState} from 'react';
import {
    AppBar,
    Badge,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
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
    Translate
} from '@mui/icons-material';
import {useLanguage} from "../hooks/useLanguage.ts";
import {useIsMobile} from "../hooks/useIsMobile.ts";
import {useAuth} from "../hooks/useAuth.ts";

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
                                           onWishlistClick
                                       }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useIsMobile();
    const {t, isRTL, language, toggleLanguage} = useLanguage();
    const {user, signOut} = useAuth();
    const navigate = useNavigate();

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

    const NavLinks = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: 2,
                alignItems: isMobile && !isRTL ? 'flex-start' : 'flex-end',
                px: isMobile ? 2 : 0
            }}
        >
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
    const handleWishlistClick = () => {
        if (onWishlistClick) {
            onWishlistClick();
        }
    }
    return (
        <>
            <AppBar position="static" color={'primary'}>
                <Toolbar sx={{justifyContent: 'space-between'}}>
                    {/* Left: Menu (on mobile) + Logo */}
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

                    {/* Middle: NavLinks for Desktop */}
                    {!isMobile && NavLinks}

                    {/* Right: Language + Wishlist + Cart + Account */}
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                        <Tooltip title={language === 'ar' ? 'en' : 'ar'}>
                            <IconButton
                                color="inherit"
                                onClick={toggleLanguage}
                                sx={{ml: 1}}
                            >
                                {language === 'ar' ? <Language/> : <Translate/>}
                            </IconButton>
                        </Tooltip>
                        {user ? (
                            <>
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
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <Person fontSize="small"/>
                                        </ListItemIcon>
                                        <ListItemText>{t.nav.profile}</ListItemText>
                                    </MenuItem>

                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <ShoppingBag fontSize="small"/>
                                        </ListItemIcon>
                                        <ListItemText>{t.nav.orders}</ListItemText>
                                    </MenuItem>

                                    <MenuItem onClick={handleWishlistClick}>
                                        <ListItemIcon>
                                            <FavoriteBorder fontSize="small"/>
                                        </ListItemIcon>
                                        <ListItemText>{t.nav.wishlist}</ListItemText>
                                    </MenuItem>

                                    <Divider/>

                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <Settings fontSize="small"/>
                                        </ListItemIcon>
                                        <ListItemText>{t.nav.settings}</ListItemText>
                                    </MenuItem>

                                    <MenuItem onClick={signOut}>
                                        <ListItemIcon>
                                            <ExitToApp fontSize="small"/>
                                        </ListItemIcon>
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
                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={toggleDrawer}
                >
                    <Box sx={{width: 250, mt: 2,}} role="presentation" onClick={toggleDrawer}>
                        {NavLinks}
                    </Box>
                </Drawer>
            )}
        </>
    );
};

export default Header;
