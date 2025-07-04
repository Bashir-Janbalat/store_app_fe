import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Container, Grid} from "@mui/material";

import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import SimilarProducts from "./SimilarProducts";
import LoadingSkeleton from "../../common/LoadingSkeleton";
import ErrorFallback from "../../common/ErrorFallback";
import type {ProductDTO, ProductReview} from "../../../types/product.ts";
import {useFetchData} from "../../../hooks/useFetchData.ts";
import {ApiType} from "../../../types/common.ts";
import {useQueryToast} from "../../../hooks/useQueryToast.ts";
import ProductAttributes from "./ProductAttributes.tsx";
import ProductReviews from "./ProductReviews.tsx";

const ProductDetails = () => {
    const {id} = useParams<{ id: string }>();
    const [product, setProduct] = useState<ProductDTO | null>(null);
    const [reviews, setReviews] = useState<ProductReview[]>([]);

    const query = useFetchData<ProductDTO>(ApiType.INVENTORY, `productDetails:${id}`, "/products/" + id);
    const {
        data: productData,
        isLoading: isLoadingProduct,
        isError: isErrorProduct,
        retryWithToast: retryProduct
    } = useQueryToast(query, {showLoading: true});

    const reviewsQuery = useFetchData<ProductReview[]>(ApiType.STORE, `productReviews:${id}`, `/products/${id}/reviews`);
    const {
        data: productReviews,
        isLoading: isLoadingReviews,
        isError: isErrorReviews,
        retryWithToast: retryReviews
    } = useQueryToast(reviewsQuery);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
        if (productData) setProduct(productData);
        if (productReviews) setReviews(productReviews);
    }, [productData, productReviews]);

    if (isLoadingProduct || isLoadingReviews) return <LoadingSkeleton/>;
    if (isErrorProduct || isErrorReviews) return <ErrorFallback onRetry={() => {
        retryProduct().then(() => {
            console.log('retry product success')
        });
        retryReviews().then(() => {
            console.log('retry reviews success')
        });
    }}/>;

    if (!product) return null;

    return (
        <Container sx={{mt: 4}}>
            <Grid container spacing={4}>
                <Grid size={{xs: 12, md: 6}}>
                    <ProductImages images={product.images}/>
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <ProductInfo product={product}/>
                </Grid>
                <Grid size={{xs: 12}}>
                    <ProductAttributes attributes={product.productAttributes}/>
                </Grid>
                <Grid size={{xs: 12}}>
                    <SimilarProducts productId={product.id!}/>
                </Grid>
                <Grid size={{xs: 12}}>
                    <ProductReviews reviews={reviews}/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetails;
