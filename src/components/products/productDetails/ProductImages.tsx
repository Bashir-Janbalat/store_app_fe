import {useState} from "react";
import {Box, Grid} from "@mui/material";
import type {ImageDTO} from "../../../types/product.ts";
import ProductThumbnails from "./ProductThumbnails.tsx";


interface ProductImagesProps {
    images: ImageDTO[];
}

const ProductImages = ({images}: ProductImagesProps) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedImage = images[selectedIndex];

    return (
        <>
            <Grid container spacing={2} wrap="nowrap">
                <Grid key={selectedImage.id}>
                    <ProductThumbnails
                        images={images}
                        selectedIndex={selectedIndex}
                        onSelect={setSelectedIndex}
                    />

                </Grid>

                <Grid size={{xs: 12}}>
                    <Box
                        sx={{
                            borderRadius: 2,
                            overflow: "hidden",
                            border: "1px solid #ccc",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <img
                            src={selectedImage.imageUrl}
                            alt={selectedImage.altText ?? "alt text"}
                            style={{width: "100%", maxHeight: "100%", objectFit: "contain"}}
                        />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default ProductImages;
