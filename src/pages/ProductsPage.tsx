import {Container} from "@mui/material";
import Products from "../components/products/Products.tsx";
import CategorySlider from "../components/categories/CategorySlider.tsx";
import {useState} from "react";


const ProductPage = () => {
    const [categoryName, setCategoryName] = useState<string | null>(null);
    return (
        <Container sx={{mt: 4}}>
            <CategorySlider selectedCategory={categoryName} onCategorySelect={setCategoryName}/>
            <Products selectedCategoryName={categoryName}/>
        </Container>
    )
}
export default ProductPage;