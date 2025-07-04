import {useNavigate, useParams} from "react-router-dom";
import ProductReviewForm from "../components/products/productDetails/ProductReviewForm.tsx";
import {useEffect, useState} from "react";
import type {AddReviewRequest, ProductDTO} from "../types/product.ts";
import {useFetchData} from "../hooks/useFetchData.ts";
import {ApiType} from "../types/common.ts";
import {useQueryToast} from "../hooks/useQueryToast.ts";
import {Container, Grid} from "@mui/material";
import ProductImages from "../components/products/productDetails/ProductImages.tsx";
import ProductInfo from "../components/products/productDetails/ProductInfo.tsx";
import LoadingSkeleton from "../components/common/LoadingSkeleton.tsx";
import ErrorFallback from "../components/common/ErrorFallback.tsx";
import {useApiMutation} from "../hooks/useApiMutation.ts";
import {toast} from "react-hot-toast";
import {useLanguage} from "../hooks/useLanguage.ts";

const ProductReviewPage = () => {
    const {t} = useLanguage();
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();
    const [product, setProduct] = useState<ProductDTO | null>(null);
    const query = useFetchData<ProductDTO>(ApiType.INVENTORY, `productDetails:${id}`, "/products/" + id);
    const {
        data: productData,
        isLoading: isLoadingProduct,
        isError: isErrorProduct,
        retryWithToast: retryProduct
    } = useQueryToast(query, {showLoading: true});

    const addReviewMutation = useApiMutation<void, AddReviewRequest>({
        method: "post",
        url: `/products/${id}/reviews`,
        api: ApiType.STORE,
        onSuccess: () => {
            toast.success(t.productReview.thankYou);
            navigate("/products/" + id);
        },
        onError: (error) => {
            toast.error(t.error.message + ": " + error.message);
        },
    });

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
        if (productData) setProduct(productData);
    }, [productData]);

    if (!id) throw new Error('Product id not found')


    if (isLoadingProduct) return <LoadingSkeleton/>;
    if (isErrorProduct) return <ErrorFallback onRetry={retryProduct}/>;
    if (!product) return null;

    const handleSubmit = (reviewRequest: AddReviewRequest): void => {
        addReviewMutation.mutate(reviewRequest);
    }

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
                    <ProductReviewForm onSubmit={handleSubmit}/>
                </Grid>
            </Grid>
        </Container>

    );
}
export default ProductReviewPage;