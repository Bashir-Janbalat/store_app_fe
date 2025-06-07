import React from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import {Box} from "@mui/material";
import {useCart} from "../../hooks/useCart.ts";

const Layout: React.FC = () => {
    const navigate = useNavigate();
    const {items} = useCart();

    const handleCartClick = () => navigate("/cart");
    const handleWishlistClick = () => navigate("/wishlist");

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box dir="ltr">
                <Header
                    cartItemsCount={items.length}
                    onCartClick={handleCartClick}
                    wishlistItemsCount={2}
                    onWishlistClick={handleWishlistClick}
                />
            </Box>

            <Box sx={{flex: 1}}>
                <Outlet/>
            </Box>
            
            <Footer/>
        </Box>
    );
};

export default Layout;
