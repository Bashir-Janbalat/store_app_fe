import {Box, Card, CardContent, CardMedia, Divider, IconButton, Typography} from "@mui/material";
import {useLanguage} from "../../../hooks/useLanguage.ts";
import {useFetchData} from "../../../hooks/useFetchData.ts";
import {ApiType} from "../../../types/common.ts";
import type {ProductDTO} from "../../../types/product.ts";
import {useQueryToast} from "../../../hooks/useQueryToast.ts";
import {useCallback, useEffect, useRef, useState} from "react";
import LoadingSkeleton from "../../common/LoadingSkeleton.tsx";
import ErrorFallback from "../../common/ErrorFallback.tsx";
import {ArrowBackIos, ArrowForwardIos} from '@mui/icons-material';
import {Link} from "react-router-dom";
import {useIsMobile} from "../../../hooks/useIsMobile.ts";

interface SimilarProductsProps {
    productId: number;
}

const SimilarProducts = ({productId}: SimilarProductsProps) => {
    const {t, isRTL} = useLanguage();
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [hasReachedEnd, setHasReachedEnd] = useState(false);
    const [canScroll, setCanScroll] = useState(false);
    const isMobile = useIsMobile();
    const limit = 10;

    const scroll = useCallback((scrollOffset: number) => {
        if (scrollRef.current && cardRef.current) {
            const cardWidth = cardRef.current.offsetWidth;
            const spacing = 16;
            const distance = (cardWidth + spacing) * scrollOffset;

            scrollRef.current.scrollBy({
                left: distance,
                behavior: 'smooth',
            });
        }
    }, []);

    const checkScrollability = () => {
        if (scrollRef.current) {
            const {scrollWidth, clientWidth, scrollLeft} = scrollRef.current;
            setCanScroll(scrollWidth > clientWidth);
            setIsAtStart(scrollLeft <= 1);
            setHasReachedEnd(scrollLeft + clientWidth >= scrollWidth - 1);
        }
    };

    useEffect(() => {
        checkScrollability();
        window.addEventListener("resize", checkScrollability);
        return () => window.removeEventListener("resize", checkScrollability);
    }, [products]);


    const handleScroll = () => {
        if (scrollRef.current) {
            const {scrollLeft, scrollWidth, clientWidth} = scrollRef.current;
            setIsAtStart(scrollLeft <= 0);
            setHasReachedEnd(scrollLeft + clientWidth >= scrollWidth - 1);
        }
    };


    const query = useFetchData<ProductDTO[], {
        limit: number,
        byCategory: boolean,
        byBrand: boolean
    }>(
        ApiType.INVENTORY,
        `relatedProducts:${productId}`,
        `/products/${productId}/related`,
        {
            limit,
            byCategory: true,
            byBrand: true
        }
    );

    const {data, isLoading, isError, retryWithToast} = useQueryToast(query, {showLoading: true});

    useEffect(() => {
        if (data && Array.isArray(data)) {
            setProducts(data);
        }
    }, [data]);

    if (isLoading) return <LoadingSkeleton/>;
    if (isError) return <ErrorFallback onRetry={retryWithToast}/>;

    return (
        <>
            <Divider sx={{mb: 2}}/>
            <Typography variant="h5" gutterBottom>{t.product.similarProducts}</Typography>
            <Box display="flex" alignItems="center" gap={1} p={2}>
                {/* سهم إلى اليسار ← */}
                {!isMobile && canScroll && !isAtStart && (
                    <IconButton onClick={() => scroll(-1)} onDoubleClick={e => e.stopPropagation()}>
                        {isRTL ? <ArrowForwardIos/> : <ArrowBackIos/>}
                    </IconButton>
                )}

                <Box
                    ref={scrollRef}
                    onScroll={handleScroll}
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': {display: 'none'},
                        m: 4,
                        direction: isRTL ? 'rtl' : 'ltr',
                    }}
                >
                    {products.map((product, index) => (
                        <Link
                            key={product.id}
                            to={`/products/${product.id}`}
                            style={{textDecoration: 'none', color: 'inherit'}}
                        >
                            <Card
                                sx={{
                                    minWidth: 220,
                                    maxWidth: 240,
                                    flexShrink: 0,
                                    mr: 2,
                                    cursor: 'pointer',
                                }}
                                ref={index === 0 ? cardRef : undefined}
                            >
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={product.images?.[0]?.imageUrl || '/placeholder.png'}
                                    alt={product.name}
                                    sx={{objectFit: 'cover'}}
                                />
                                <CardContent>
                                    <Typography variant="subtitle1" noWrap>
                                        {product.name}
                                    </Typography>
                                    {product.sellingPrice !== undefined && (
                                        <Typography variant="body2" color="text.secondary">
                                            {product.sellingPrice.toFixed(2)} {t.common.currency}
                                        </Typography>
                                    )}
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </Box>

                {/* سهم إلى اليمين → */}
                {!isMobile && canScroll && !hasReachedEnd && (
                    <IconButton onClick={() => scroll(1)} onDoubleClick={e => e.stopPropagation()}>
                        {isRTL ? <ArrowBackIos/> : <ArrowForwardIos/>}
                    </IconButton>
                )}
            </Box>
        </>
    );
};

export default SimilarProducts;
