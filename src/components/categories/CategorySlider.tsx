import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { useFetchData } from '../../hooks/useFetchData';
import { ApiType, type PagedResponseDTO } from '../../types/common';
import type { CategoryDTO } from '../../types/category';
import LoadingSkeleton from '../common/LoadingSkeleton';
import ErrorFallback from '../common/ErrorFallback';
import { useQueryToast } from '../../hooks/useQueryToast';
import ItemSlider from '../common/ItemSlider';

interface CategorySliderProps {
    selectedCategory: string | null;
    onCategorySelect: (categoryName: string | null) => void;
}

const CategorySlider: React.FC<CategorySliderProps> = ({ selectedCategory, onCategorySelect }) => {
    const { t } = useLanguage();
    const [categories, setCategories] = useState<CategoryDTO[]>([]);

    const query = useFetchData<PagedResponseDTO<CategoryDTO>, { page: number; size: number }>(
        ApiType.INVENTORY,
        'categorySlider',
        '/categories',
        { page: 0, size: 1000 }
    );

    const { data, isLoading, isError, retryWithToast } = useQueryToast(query, { showLoading: true });

    useEffect(() => {
        if (data) setCategories(data.content);
    }, [data]);

    if (isLoading) return <LoadingSkeleton />;
    if (isError) return <ErrorFallback onRetry={retryWithToast} />;

    return (
        <ItemSlider
            title={t.categories.title}
            items={categories}
            selectedItem={selectedCategory}
            onSelect={onCategorySelect}
            getLabel={(item) => item.name}
            getId={(item) => item.id}
        />
    );
};

export default CategorySlider;
