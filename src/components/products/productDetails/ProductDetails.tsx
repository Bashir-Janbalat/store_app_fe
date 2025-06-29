import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Container, Grid} from "@mui/material";

import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import SimilarProducts from "./SimilarProducts";
import LoadingSkeleton from "../../common/LoadingSkeleton";
import ErrorFallback from "../../common/ErrorFallback";
import type {ProductDTO} from "../../../types/product.ts";
import {useFetchData} from "../../../hooks/useFetchData.ts";
import {ApiType} from "../../../types/common.ts";
import {useQueryToast} from "../../../hooks/useQueryToast.ts";
import ProductAttributes from "./ProductAttributes.tsx";

const ProductDetails = () => {
    const {id} = useParams<{ id: string }>();
    const [product, setProduct] = useState<ProductDTO | null>(null);

    const query = useFetchData<ProductDTO>(ApiType.INVENTORY, `productDetails:${id}`, "/products/" + id);
    const {data, isLoading, isError, retryWithToast} = useQueryToast(query, {showLoading: true});

    useEffect(() => {
        if (data) setProduct(data);
    }, [data]);

    if (isLoading) return <LoadingSkeleton/>;
    if (isError) return <ErrorFallback onRetry={retryWithToast}/>;
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
            </Grid>
        </Container>
    );
};

export default ProductDetails;
