import { Box, Grid, IconButton, Stack } from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { useState } from "react";
import type { ImageDTO } from "../../../types/product.ts";

interface ProductImagesProps {
    images: ImageDTO[];
    selectedIndex: number;
    onSelect: (index: number) => void;
}

const maxSlides = 5;

const ProductThumbnails = ({ images, selectedIndex, onSelect }: ProductImagesProps) => {
    const [startIndex, setStartIndex] = useState(0);

    const handleScrollUp = () => {
        setStartIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleScrollDown = () => {
        setStartIndex((prev) => Math.min(prev + 1, images.length - maxSlides));
    };

    const visibleImages = images.slice(startIndex, startIndex + maxSlides);

    const isScrollable = images.length > maxSlides;

    return (
        <Box sx={{ width: 100, height: 300, position: "relative" }}>
            {isScrollable && (
                <Box sx={{ position: "absolute", top: 0, right: -40 }}>
                    <IconButton
                        aria-label="Scroll up"
                        size="small"
                        onClick={handleScrollUp}
                        disabled={startIndex === 0}
                    >
                        <ArrowUpward />
                    </IconButton>
                </Box>
            )}

            <Stack spacing={2} sx={{ height: "100%",mr:1 }}>
                {visibleImages.map((img, index) => {
                    const actualIndex = startIndex + index;
                    return (
                        <Grid
                            key={img.id ?? actualIndex}
                            onClick={() => onSelect(actualIndex)}
                            sx={{
                                border: selectedIndex === actualIndex ? "2px solid" : "1px solid",
                                borderColor: selectedIndex === actualIndex ? "primary.main" : "grey.400",
                                borderRadius: 1,
                                overflow: "hidden",
                                cursor: "pointer",
                            }}
                        >
                            <img
                                src={img.imageUrl}
                                alt={img.altText || "Product image"}
                                loading="lazy"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                        </Grid>
                    );
                })}
            </Stack>

            {isScrollable && (
                <Box sx={{ position: "absolute", bottom: 0, right: -40 }}>
                    <IconButton
                        aria-label="Scroll down"
                        size="small"
                        onClick={handleScrollDown}
                        disabled={startIndex + maxSlides >= images.length}
                    >
                        <ArrowDownward />
                    </IconButton>
                </Box>
            )}
        </Box>
    );
};

export default ProductThumbnails;
