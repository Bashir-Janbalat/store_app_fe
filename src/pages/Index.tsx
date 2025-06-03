import {Container} from "@mui/material";
import FeaturedProducts from "../components/products/FeaturedProducts.tsx";
import Features from "../components/Home/Features.tsx";
import Hero from "../components/Home/Hero.tsx";


const Index = () => {

    return (
        <>
            <Hero/>
            <Container sx={{mt: 4}}>
                <Features/>
                <FeaturedProducts/>
            </Container>
        </>
    )
}
export default Index;