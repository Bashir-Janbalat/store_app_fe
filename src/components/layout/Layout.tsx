import React from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import Header from './Header';
import {Box} from "@mui/material";
import Footer from "./Footer";
import {useCart} from "../../hooks/useCart.ts";

const Layout: React.FC = () => {
    const navigate = useNavigate();
    const {items} = useCart();
    const handleCartClick = () => {
        navigate("/cart");
    };

    const handleWishlistClick = () => {
        navigate("/wishlist");
    };


    return (
        <>
            <Box dir="ltr">
                <Header cartItemsCount={items.length}
                        onCartClick={handleCartClick}
                        wishlistItemsCount={2}
                        onWishlistClick={handleWishlistClick}
                />
            </Box>
            <Outlet/>
            <Footer/>
        </>
    );
};

export default Layout;