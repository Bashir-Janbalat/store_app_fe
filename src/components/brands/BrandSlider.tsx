import React, {useEffect, useState} from "react";
import {useLanguage} from "../../hooks/useLanguage.ts";
import type {BrandDTO} from "../../types/brand.ts";
import {useFetchData} from "../../hooks/useFetchData.ts";
import {ApiType, type PagedResponseDTO} from "../../types/common.ts";
import {useQueryToast} from "../../hooks/useQueryToast.ts";
import LoadingSkeleton from "../common/LoadingSkeleton.tsx";
import ErrorFallback from "../common/ErrorFallback.tsx";
import ItemSlider from "../common/ItemSlider.tsx";

interface BrandSliderProps {
    selectedBrand: string | null;
    selectedCategory: string | null;
    onBrandSelect: (brandName: string | null) => void;
}

const BrandSlider: React.FC<BrandSliderProps> = ({selectedBrand, onBrandSelect, selectedCategory}) => {
    const {t} = useLanguage();
    const [brands, setBrands] = useState<BrandDTO[]>([]);


    const query =
        useFetchData<PagedResponseDTO<BrandDTO>, { page: number, size: number, searchByCategory: string | undefined }>
        (ApiType.INVENTORY, "BrandSlider", "/brands", {
            page: 0,
            size: 1000,
            searchByCategory: selectedCategory || undefined,
        });
    const {data, isLoading, isError, retryWithToast} = useQueryToast(query, {showLoading: true});

    useEffect(() => {
        if (data)
            setBrands(data.content);
    }, [data]);

    if (isLoading) return <LoadingSkeleton/>;
    if (isError) return <ErrorFallback onRetry={retryWithToast}/>;

    return (
        <ItemSlider
            title={t.brands.title}
            items={brands}
            selectedItem={selectedBrand}
            onSelect={onBrandSelect}
            getLabel={(item) => item.name}
            getId={(item) => item.id}
        />
    );
};

export default BrandSlider;