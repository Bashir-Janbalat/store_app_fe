import React, {useEffect, useRef, useState} from 'react';
import {Box, Chip, IconButton, Typography} from '@mui/material';
import {ArrowBackIos, ArrowForwardIos} from '@mui/icons-material';
import {useLanguage} from "../../hooks/useLanguage.ts";
import {useFetchData} from "../../hooks/useFetchData.ts";
import {ApiType, type PagedResponseDTO} from "../../types/common.ts";
import type {CategoryDTO} from "../../types/category.ts";
import LoadingSkeleton from '../common/LoadingSkeleton.tsx';
import ErrorFallback from "../common/ErrorFallback.tsx";
import {useQueryToast} from "../../hooks/useQueryToast.ts";

interface CategorySliderProps {
    selectedCategory: string | null;
    onCategorySelect: (categoryName: string | null) => void;
}

const CategorySlider: React.FC<CategorySliderProps> = ({selectedCategory, onCategorySelect}) => {
    const {t} = useLanguage();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [categories, setCategories] = useState<CategoryDTO[]>([]);

    const scroll = (scrollOffset: number) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({left: scrollOffset, behavior: 'smooth'});
        }
    };
    const query =
        useFetchData<PagedResponseDTO<CategoryDTO>, { page: number, size: number }>
        (ApiType.INVENTORY, "categorySlider", "/categories", {
            page: 0,
            size: 1000
        });
    const {data, isLoading, isError, retryWithToast} = useQueryToast(query, {showLoading: true});

    useEffect(() => {
        if (data)
            setCategories(data.content);
    }, [data]);

    if (isLoading) return <LoadingSkeleton/>;
    if (isError) return <ErrorFallback onRetry={retryWithToast}/>;
    return (
        <Box display="flex" flexDirection="column" gap={2} p={2}>
            <Typography variant="h5" textAlign="center">
                {t.categories.title}
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
                    {categories.map((category) => (
                        <Chip
                            key={category.id}
                            label={category.name}
                            sx={{
                                fontSize: '1rem',
                                marginRight: 1,
                                whiteSpace: 'nowrap',
                                cursor: 'pointer',
                                height: '50px',
                                px: 2,
                                borderColor: selectedCategory === category.name ? 'primary.main' : undefined,
                                backgroundColor: selectedCategory === category.name ? 'primary.light' : undefined,
                            }}
                            variant={selectedCategory === category.name ? 'filled' : 'outlined'}
                            onClick={() => onCategorySelect(selectedCategory === category.name ? null : category.name)}
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

export default CategorySlider;
