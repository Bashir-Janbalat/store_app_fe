import {Box, Button, Chip, Typography} from "@mui/material";
import type {ProductDTO} from "../../../types/product.ts";
import {useLanguage} from "../../../hooks/useLanguage.ts";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useAddToCart} from "../../../hooks/useAddToCart.ts";
import {useWishlistActions} from "../../../hooks/useWishlistActions.ts";

interface ProductInfoProps {
    product: ProductDTO;
}

const ProductInfo = ({product}: ProductInfoProps) => {
    const {t} = useLanguage();
    const { handleAddToCart } = useAddToCart();
    const { isInWishlist, handleToggleWishlist } = useWishlistActions();

    const inWishlist = isInWishlist(product.id);

    return (
        <Box>
            <Typography variant="h4" gutterBottom>{product.name}</Typography>
            <Typography variant="subtitle1" color="text.secondary">{product.description}</Typography>
            <Typography variant="h5" color="primary" sx={{my: 2}}>
                {t.product.price}: {product.sellingPrice} €
            </Typography>

            <Chip label={`${t.product.brand}: ${product.brandName}`} sx={{mr: 1}}/>
            <Chip label={`${t.product.category}: ${product.categoryName}`}/>

            <Typography sx={{mt: 2}}>
                {t.product.supplier}: {product.supplierName}
            </Typography>


            <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartIcon/>}
                sx={{mt: 3}}
                onClick={() => handleAddToCart(product.id!, product.name, product.description!, product.sellingPrice!, product.images)}
            >
                {t.product.addToCart}
            </Button>

            <Button
                variant={inWishlist ? "contained" : "outlined"}
                color="secondary"
                startIcon={inWishlist ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                sx={{mt: 3, ml: 2}}
                onClick={() => handleToggleWishlist(product)}
            >
                {inWishlist? t.product.removeFromWishlist : t.product.addToWishlist}
            </Button>
        </Box>
    );
};

export default ProductInfo;
