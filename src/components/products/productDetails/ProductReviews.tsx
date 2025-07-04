import {Box, Button, Divider, Rating, Typography} from "@mui/material";
import type {ProductReview} from "../../../types/product";
import {useLanguage} from "../../../hooks/useLanguage.ts";
import {useState} from "react";
import {ArrowDownward} from '@mui/icons-material';

interface Props {
    reviews: ProductReview[];
}

const REVIEWS_INCREMENT = 3;

const ProductReviews = ({reviews}: Props) => {
    const {t} = useLanguage();
    const [visibleCount, setVisibleCount] = useState(REVIEWS_INCREMENT);
    const reviewsToShow = reviews.slice(0, visibleCount);

    if (reviews.length === 0) {
        return (
            <>
            </>
        );
    }

    const handleShowMore = () => {
        setVisibleCount(prevCount => Math.min(prevCount + REVIEWS_INCREMENT, reviews.length));
    };

    return (
        <>
            <Divider sx={{mb: 2}}/>
            <Typography variant="h6" sx={{mb: 2, fontWeight: 'bold'}}>
                {t.productReview.userReviews}
            </Typography>
            <Box>
                {reviewsToShow.map((review, index) => (
                    <Box key={index} sx={{mb: 3}}>
                        <Rating value={review.rating} precision={0.5} readOnly/>
                        <br/>
                        <Typography variant="caption" color="text.secondary">
                            {review.reviewerName} - {review.createdAt}
                        </Typography>
                        <Typography variant="body2" sx={{mt: 1}}>{review.review}</Typography>
                        <Divider sx={{my: 2}}/>
                    </Box>
                ))}

            </Box>
            {visibleCount < reviews.length && (
                <Button
                    variant="outlined"
                    onClick={handleShowMore}
                    endIcon={<ArrowDownward/>}
                    sx={{
                        mt: 2,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        transition: 'transform 0.3s',
                        '&:hover': {
                            backgroundColor: 'primary.light',
                            transform: 'scale(1.05)',
                        },
                    }}
                >
                    {t.productReview.showMore}
                </Button>
            )}
        </>
    );
};

export default ProductReviews;
