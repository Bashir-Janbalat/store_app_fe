import {Container} from "@mui/material";
import CategorySlider from "../components/categories/CategorySlider.tsx";
import {useState} from "react";
import FeaturedProducts from "../components/products/FeaturedProducts.tsx";


const Index = () => {
    const [categoryName, setCategoryName] = useState<string | null>(null);

    return (
        <Container sx={{mt: 4}}>
            <CategorySlider selectedCategory={categoryName} onCategorySelect={setCategoryName}/>
            <FeaturedProducts selectedCategoryName={categoryName}/>
        </Container>
    )
}
export default Index;