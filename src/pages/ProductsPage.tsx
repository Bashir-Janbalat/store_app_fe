import {Container} from "@mui/material";
import Products from "../components/products/Products.tsx";
import CategorySlider from "../components/categories/CategorySlider.tsx";
import {useState} from "react";
import BrandSlider from "../components/brands/BrandSlider.tsx";


const ProductPage = () => {
    const [categoryName, setCategoryName] = useState<string | null>(null);
    const [brandName, setBrandName] = useState<string | null>(null);
    return (
        <Container sx={{mt: 4}}>
            <CategorySlider selectedCategory={categoryName} onCategorySelect={setCategoryName}/>
            <BrandSlider selectedBrand={brandName} onBrandSelect={setBrandName}/>
            <Products selectedCategoryName={categoryName} selectedBrandName={brandName}/>
        </Container>
    )
}
export default ProductPage;