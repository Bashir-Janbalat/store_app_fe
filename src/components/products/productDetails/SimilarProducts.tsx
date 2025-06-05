import {Box, Divider, Typography} from "@mui/material";
import {useLanguage} from "../../../hooks/useLanguage.ts";

const SimilarProducts = () => {
    const {t} = useLanguage();
    return (
        <Box sx={{mt: 6}}>
            <Divider sx={{mb: 2}}/>
            <Typography variant="h5" gutterBottom>{t.product.similarProducts}</Typography>
            <Typography>قريباً سيتم عرض المنتجات المشابهة هنا...</Typography>
        </Box>
    );
};

export default SimilarProducts;