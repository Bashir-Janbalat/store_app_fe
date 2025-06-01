import React, {useEffect, useRef, useState} from 'react';
import {Box, Chip, IconButton, Typography} from '@mui/material';
import {ArrowBackIos, ArrowForwardIos} from '@mui/icons-material';
import {useLanguage} from "../hooks/useLanguage.ts";
import {useFetchData} from "../hooks/useFetchData.ts";
import {ApiType, type PagedResponseDTO} from "../types/common.ts";
import type {CategoryDTO} from "../types/category.ts";

interface CategorySliderProps {
    selectedCategoryId: number | null;
    onCategorySelect: (categoryId: number | null) => void;
}

const CategorySlider: React.FC<CategorySliderProps> = ({selectedCategoryId, onCategorySelect}) => {
    const {t} = useLanguage();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [categories, setCategories] = useState<CategoryDTO[]>([]);

    const scroll = (scrollOffset: number) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({left: scrollOffset, behavior: 'smooth'});
        }
    };
    const {data, isLoading, error} =
        useFetchData<PagedResponseDTO<CategoryDTO>, { page: number, size: number }>
        (ApiType.INVENTORY, 'categories', '/categories', {page: 0, size: 1000});

    useEffect(() => {
        if (data)
            setCategories(data.content);
    }, [data]);

    if (isLoading) return <p>Loading categories...</p>;
    if (error) return <p>Error loading categories {error.message}.</p>;

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
                                borderColor: selectedCategoryId === category.id ? 'primary.main' : undefined,
                                backgroundColor: selectedCategoryId === category.id ? 'primary.light' : undefined,
                            }}
                            variant={selectedCategoryId === category.id ? 'filled' : 'outlined'}
                            onClick={() => onCategorySelect(category.id)}
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
