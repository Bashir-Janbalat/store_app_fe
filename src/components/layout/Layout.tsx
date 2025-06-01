import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from './Header';
import {Box} from "@mui/material";

const Layout: React.FC = () => {
    const handleCartClick = () => {
        console.log("cart clicked");
    };

    const handleWishlistClick = () => {
        console.log("wishlist clicked");
    };


    return (
        <>
            <Box dir="ltr">
                <Header cartItemsCount={2}
                        onCartClick={handleCartClick}
                        wishlistItemsCount={2}
                        onWishlistClick={handleWishlistClick}/>
            </Box>
            <Outlet/>
            {/*<Footer/>*/}
        </>
    );
};

export default Layout;