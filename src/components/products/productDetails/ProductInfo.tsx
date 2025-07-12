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

const
    ProductInfo = ({product}: ProductInfoProps) => {
        const {t} = useLanguage();
        const {handleAddToCart} = useAddToCart();
        const {isInWishlist, handleToggleWishlist} = useWishlistActions();

        const inWishlist = isInWishlist(product.id);

        const totalStock = product.stocks?.reduce((sum, stock) => sum + stock.quantity, 0) ?? 0;

        return (
            <Box>
                <Typography variant="h4" gutterBottom>{product.name}</Typography>
                <Typography variant="subtitle1" color="text.secondary">{product.description}</Typography>
                <Typography variant="h5" color="primary" sx={{my: 2}}>
                    {t.product.price}: {product.sellingPrice} {t.common.currency}
                </Typography>

                <Chip label={`${t.product.brand}: ${product.brandName}`} sx={{mr: 1}}/>
                <Chip label={`${t.product.category}: ${product.categoryName}`}/>

                <Typography sx={{mt: 2}}>
                    {t.product.supplier}: {product.supplierName}
                </Typography>
                <Typography sx={{mt: 2, fontWeight: 'bold'}}>
                    {totalStock > 0
                        ? `${t.product.inStock}: ${totalStock}`
                        : t.product.outOfStock}
                </Typography>
                <Box sx={{
                    mt: 2,
                    display: 'flex',
                    flexDirection: {xs: 'column', sm: 'row'}, // عمودي على الشاشات الصغيرة وأفقي على الكبيرة
                    gap: 2 // المسافة بين الأزرار
                }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ShoppingCartIcon/>}
                        onClick={() => handleAddToCart(product.name, product.images, product.description!, totalStock, product.id!, product.sellingPrice!)}
                        disabled={totalStock === 0}
                    >
                        {t.product.addToCart}
                    </Button>

                    <Button
                        variant={inWishlist ? "contained" : "outlined"}
                        color="secondary"
                        startIcon={inWishlist ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                        onClick={() => handleToggleWishlist(product)}
                    >
                        {inWishlist ? t.product.removeFromWishlist : t.product.addToWishlist}
                    </Button>
                </Box>
            </Box>
        );
    };

export default ProductInfo;
