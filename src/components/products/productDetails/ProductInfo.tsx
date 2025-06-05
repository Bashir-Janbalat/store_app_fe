import {Box, Button, Chip, Typography} from "@mui/material";
import type {ProductDTO} from "../../../types/product.ts";
import {useLanguage} from "../../../hooks/useLanguage.ts";

interface ProductInfoProps {
    product: ProductDTO;
}

const ProductInfo = ({product}: ProductInfoProps) => {
    const {t} = useLanguage();
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

            <Button variant="contained" color="primary" sx={{mt: 3}}>
                {t.product.addToCart}
            </Button>
        </Box>
    );
};

export default ProductInfo;
