import {Box, IconButton} from "@mui/material";
import {ArrowDownward, ArrowUpward} from "@mui/icons-material";
import {useKeenSlider} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import type {ImageDTO} from "../../../types/product.ts";

interface ProductImagesProps {
    images: ImageDTO[];
    selectedIndex: number;
    onSelect: (index: number) => void;
}

const maxSlides = 5;

const ProductThumbnails = ({images, selectedIndex, onSelect}: ProductImagesProps) => {
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        loop: false,
        vertical: true,
        slides: {
            perView: Math.min(images.length, maxSlides),
            spacing: 10,
        }
    });

    const handlePrev = () => {
        instanceRef.current?.prev();
    };

    const handleNext = () => {
        instanceRef.current?.next();
    };

    return (
        <Box sx={{width: 100, height: 300, position: "relative"}}>
            <Box ref={sliderRef} className="keen-slider" sx={{height: "100%"}}>
                {images.map((img, index) => (
                    <Box
                        key={img.id ?? index}
                        className="keen-slider__slide"
                        onClick={() => {
                            onSelect(index);
                            instanceRef.current?.moveToIdx(index);
                        }}
                        sx={{
                            border: selectedIndex === index ? "2px solid #1976d2" : "1px solid #ccc",
                            borderRadius: 1,
                            overflow: "hidden",
                            cursor: "pointer",
                            width: 80,
                            height: 80,
                            ml: 1,
                            mr: 1,
                        }}
                    >
                        <img
                            src={img.imageUrl}
                            alt={img.altText ?? "alt text"}
                            loading="lazy"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                            }}
                        />
                    </Box>
                ))}
            </Box>

            {images.length > maxSlides && (
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        right: -40,
                        transform: "translateY(-50%)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                    }}
                >
                    <IconButton
                        aria-label="previous"
                        size="small"
                        onClick={handlePrev}
                        color="primary"
                    >
                        <ArrowUpward/>
                    </IconButton>
                    <IconButton
                        aria-label="next"
                        size="small"
                        onClick={handleNext}
                        color="primary"
                    >
                        <ArrowDownward/>
                    </IconButton>
                </Box>
            )}
        </Box>
    );
};

export default ProductThumbnails;
