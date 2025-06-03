import React, {useEffect, useRef, useState} from "react";
import {useLanguage} from "../../hooks/useLanguage.ts";
import type {BrandDTO} from "../../types/brand.ts";
import {useFetchData} from "../../hooks/useFetchData.ts";
import {ApiType, type PagedResponseDTO} from "../../types/common.ts";
import type {CategoryDTO} from "../../types/category.ts";
import {useQueryToast} from "../../hooks/useQueryToast.ts";
import LoadingSkeleton from "../common/LoadingSkeleton.tsx";
import ErrorFallback from "../common/ErrorFallback.tsx";
import {Box, Chip, IconButton, Typography} from "@mui/material";
import {ArrowBackIos, ArrowForwardIos} from "@mui/icons-material";

interface BrandSliderProps {
    selectedBrand: string | null;
    onBrandSelect: (brandName: string | null) => void;
}

const BrandSlider: React.FC<BrandSliderProps> = ({selectedBrand, onBrandSelect}) => {
    const {t} = useLanguage();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [brands, setBrands] = useState<BrandDTO[]>([]);

    const scroll = (scrollOffset: number) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({left: scrollOffset, behavior: 'smooth'});
        }
    };
    const query =
        useFetchData<PagedResponseDTO<CategoryDTO>, { page: number, size: number }>
        (ApiType.INVENTORY, "BrandSlider", "/brands", {
            page: 0,
            size: 1000
        });
    const {data, isLoading, isError, retryWithToast} = useQueryToast(query, {showLoading: true});

    useEffect(() => {
        if (data)
            setBrands(data.content);
    }, [data]);

    if (isLoading) return <LoadingSkeleton/>;
    if (isError) return <ErrorFallback onRetry={retryWithToast}/>;

    return (
        <Box display="flex" flexDirection="column" gap={2} p={2}>
            <Typography variant="h5" textAlign="center">
                {t.brands.title}
            </Typography>

            <Box display="flex" alignItems="center" gap={1}>
                <IconButton onClick={() => scroll(-200)}>
                    <ArrowBackIos/>
                </IconButton>

                <Box
                    ref={scrollRef}
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': {display: 'none'},
                    }}
                >
                    {brands.map((brand) => (
                        <Chip
                            key={brand.id}
                            label={brand.name}
                            sx={{
                                fontSize: '1rem',
                                marginRight: 1,
                                whiteSpace: 'nowrap',
                                cursor: 'pointer',
                                height: '50px',
                                px: 2,
                                borderColor: selectedBrand === brand.name ? 'primary.main' : undefined,
                                backgroundColor: selectedBrand === brand.name ? 'primary.light' : undefined,
                            }}
                            variant={selectedBrand === brand.name ? 'filled' : 'outlined'}
                            onClick={() => onBrandSelect(selectedBrand === brand.name ? null : brand.name)}
                        />
                    ))}
                </Box>

                <IconButton onClick={() => scroll(200)}>
                    <ArrowForwardIos/>
                </IconButton>
            </Box>
        </Box>
    );
};
export default BrandSlider;