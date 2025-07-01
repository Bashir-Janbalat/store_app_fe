import {useState} from 'react';
import {Box, Grid} from '@mui/material';
import CategorySlider from '../components/categories/CategorySlider';
import BrandSlider from '../components/brands/BrandSlider';
import Products from '../components/products/Products';
import FilterSidebar from '../components/filters/FilterSidebar';


const ProductPage = () => {
    const [categoryName, setCategoryName] = useState<string | null>(null);
    const [brandName, setBrandName] = useState<string | null>(null);
    const [productsFilter, setProductsFilter] = useState<{ minPrice: number, maxPrice: number,inStock?: boolean } | null>(null);

    const handleCategorySelect = (newCategory: string | null) => {
        setCategoryName(newCategory);
        setBrandName(null);
    };
    return (
        <Grid container sx={{mt: 4}}>
            <Grid size={{xs: 12, md: 2}}>
                <FilterSidebar
                    onApply={(filters) => setProductsFilter(filters)}
                    onReset={() => setProductsFilter(null)}
                />
            </Grid>

            <Grid size={{xs: 12, md: 9}}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <CategorySlider selectedCategory={categoryName} onCategorySelect={handleCategorySelect}/>
                    <BrandSlider selectedBrand={brandName} selectedCategory={categoryName} onBrandSelect={setBrandName} />
                    <Products
                        selectedCategoryName={categoryName}
                        selectedBrandName={brandName}
                        minPrice={productsFilter?.minPrice}
                        maxPrice={productsFilter?.maxPrice}
                        inStock={productsFilter?.inStock}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}
export default ProductPage;