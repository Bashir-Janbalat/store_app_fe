import React, {useState} from 'react';
import {Alert, Box, Button, Rating, Stack, TextField, Typography,} from '@mui/material';
import {useLanguage} from "../../../hooks/useLanguage.ts";
import type {AddReviewRequest} from "../../../types/product.ts";

interface ProductReviewFormProps {
    onSubmit?: (data: AddReviewRequest) => void;
}

const ProductReviewForm: React.FC<ProductReviewFormProps> = ({onSubmit}) => {
    const {t} = useLanguage();
    const [rating, setRating] = useState<number | null>(0);
    const [review, setReview] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        if (rating && rating > 0) {
            onSubmit?.({rating, review});
            setSubmitted(true);
            setRating(0);
            setReview('');
        }
    };

    return (
        <Box sx={{p: 2}}>
            <Typography variant="h6" gutterBottom>
                {t.productReview.writeReview}
            </Typography>

            {submitted && (
                <Alert severity="success" sx={{mb: 2}}>
                    {t.productReview.thankYou}
                </Alert>
            )}

            <Stack spacing={2}>
                <Box>
                    <Typography component="legend">{t.productReview.yourRating}</Typography>
                    <Rating
                        name="product-rating"
                        value={rating}
                        precision={0.5}
                        onChange={(_, newValue) => setRating(newValue)}
                    />
                </Box>

                <TextField
                    label={t.productReview.yourComment}
                    multiline
                    minRows={3}
                    fullWidth
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />

                <Button
                    variant="contained"
                    color="primary"
                    disabled={!rating}
                    onClick={handleSubmit}
                >
                    {t.productReview.submitReview}
                </Button>
            </Stack>
        </Box>
    );
};

export default ProductReviewForm;
