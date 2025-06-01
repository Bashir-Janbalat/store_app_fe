import React, {useState} from 'react';
import {
    AppBar,
    Badge,
    Box,
    Button,
    Drawer,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import {Link} from 'react-router-dom';
import {
    AccountCircle,
    FavoriteBorder,
    Language,
    Menu as MenuIcon,
    ShoppingCart,
    Store,
    Translate
} from '@mui/icons-material';
import {useLanguage} from "../hooks/useLanguage.ts";
import {useIsMobile} from "../hooks/useIsMobile.ts";

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

                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                            <MenuItem onClick={handleClose}>{t.nav.profile}</MenuItem>
                            <MenuItem onClick={handleClose}>{t.nav.account}</MenuItem>
                            <MenuItem onClick={handleClose}>{t.nav.logout}</MenuItem>
                        </Menu>
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
