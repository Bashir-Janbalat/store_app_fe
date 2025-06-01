import {Box, Container} from "@mui/material";
import CategorySlider from "../categories/CategorySlider.tsx";
import {useState} from "react";


const Index = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    return (
        <>
            <Box>
                <Container sx={{mt: 4}}>
                    <CategorySlider selectedCategoryId={selectedCategoryId} onCategorySelect={setSelectedCategoryId}/>
                </Container>
            </Box>
        </>
    )
}
export default Index;