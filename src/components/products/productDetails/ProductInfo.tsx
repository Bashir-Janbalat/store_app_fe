import {Box, Button, Chip, Typography} from "@mui/material";
import type {ProductDTO} from "../../../types/product.ts";
import {useLanguage} from "../../../hooks/useLanguage.ts";
import {useCart} from "../../../hooks/useCart.ts";
import {mapProductToCartItem} from "../../../utils/cartHelpers.ts";
import toast from "react-hot-toast";

interface ProductInfoProps {
    product: ProductDTO;
}

const ProductInfo = ({product}: ProductInfoProps) => {
    const {t} = useLanguage();
    const {addToCart} = useCart();

    const handleAddToCart = (product: ProductDTO) => {
        const mapped = mapProductToCartItem(product);
        if (!mapped){
            toast.error("Invalid product data");
            return;
        }
        addToCart(mapped.product, mapped.productId, mapped.unitPrice);
    };
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

            <Button variant="contained" color="primary" sx={{mt: 3}} onClick={() => handleAddToCart(product)}>
                {t.product.addToCart}
            </Button>
        </Box>
    );
};

export default ProductInfo;
