import type {ProductAttributeDTO} from "../../../types/product.ts";
import {Box, Divider, Typography} from "@mui/material";
import {useLanguage} from "../../../hooks/useLanguage.ts";

interface ProductAttributesProps {
    attributes: ProductAttributeDTO[];
}

const ProductAttributes = ({attributes}: ProductAttributesProps) => {
    const {t} = useLanguage();
    return (
        <Box sx={{mt: 3}}>
            <Divider sx={{mb: 2}}/>
            <Typography variant="h5" gutterBottom>{t.product.details}</Typography>
            {attributes.map(attr => (
                <Typography key={attr.attributeID}>
                    {attr.attributeName}: {attr.attributeValue}
                </Typography>
            ))}
        </Box>
    );
}
export default ProductAttributes;