import {Box, Container, Typography} from "@mui/material";
import Header from "../layout/Header.tsx";

const handleCartClick = () => {
    console.log("cart clicked");
};

const handleWishlistClick = () => {
    console.log("wishlist clicked");
};

const Index = () => {
    return (
        <>
            <Box>
                <Box dir="ltr">
                    <Header cartItemsCount={2}
                            onCartClick={handleCartClick}
                            wishlistItemsCount={2}
                            onWishlistClick={handleWishlistClick}/>
                </Box>
                <Container sx={{mt: 4}}>
                    <Typography variant="h4" component="h2">
                        مرحبًا بك في المتجر!
                    </Typography>
                </Container>
            </Box>
        </>
    )
}
export default Index;