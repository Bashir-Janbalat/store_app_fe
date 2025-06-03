import {Container, Grid, Pagination, Stack, Typography} from '@mui/material';
import ProductCard from "./ProductCard.tsx";
import type {ProductDTO} from '../../types/product.ts';
import {useFetchData} from "../../hooks/useFetchData.ts";
import {ApiType, type PagedResponseDTO} from "../../types/common.ts";
import {useEffect, useState} from 'react';
import LoadingSkeleton from "../common/LoadingSkeleton.tsx";
import {useQueryToast} from "../../hooks/useQueryToast.ts";
import ErrorFallback from "../common/ErrorFallback.tsx";
import {useLanguage} from "../../hooks/useLanguage.ts";

interface FeaturedProductsProps {
    selectedCategoryName: string | null;
}

const FeaturedProducts = ({selectedCategoryName}: FeaturedProductsProps) => {
    const {t} = useLanguage();
    const [wishlist, setWishlist] = useState<number[]>([]);
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const size = 8;
    const query =
        useFetchData<PagedResponseDTO<ProductDTO>, { categoryName?: string, page: number, size: number }>
        (ApiType.INVENTORY, "featuredProducts", "/products", {
            categoryName: selectedCategoryName || undefined,
            page: page - 1,
            size: size
        });

    const {data, isLoading, isError, retryWithToast} = useQueryToast(query, {showLoading: true});

    useEffect(() => {
        setPage(1);
    }, [selectedCategoryName]);

    useEffect(() => {
        if (data) {
            setProducts(data.content);
            setTotalPages(data.totalPages ?? 1);
        }
    }, [data]);


    if (isLoading) return <LoadingSkeleton/>;
    if (isError) return <ErrorFallback onRetry={retryWithToast}/>;


    const toggleWishlist = (productId: number) => {
        setWishlist(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const handleAddToCart = (productId: number) => {
        console.log('أضيف المنتج إلى السلة:', productId);
    };

    return (
        <Container>
            <Typography variant="h5" textAlign="center">
                {t.featuredProducts.title}
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {products.map((product: ProductDTO) => (
                    <Grid size={{xs: 12, sm: 6, md: 4, lg: 3}} key={product.id} display="flex"
                          justifyContent={'center'}>
                        <ProductCard
                            product={product}
                            isInWishlist={wishlist.includes(product.id!)}
                            onWishlistToggle={toggleWishlist}
                            onAddToCart={handleAddToCart}
                        />
                    </Grid>
                ))}
            </Grid>
            <Stack direction="row" justifyContent="center" alignItems="center" marginTop={4}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_event, value) => setPage(value)}
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                />
            </Stack>
        </Container>
    );
}
export default FeaturedProducts;
