import {Button, Card, CardActions, CardContent, CardMedia, IconButton, Tooltip, Typography,} from '@mui/material';
import {Favorite, FavoriteBorder} from '@mui/icons-material';
import type {ProductDTO} from "../../types/product.ts";
import {useLanguage} from "../../hooks/useLanguage.ts";
import {Link} from 'react-router-dom';

interface Props {
    product: ProductDTO;
    isInWishlist: boolean;
    onWishlistToggle: (productId: number) => void;
    onAddToCart: (productId: number) => void;
}

const ProductCard = ({product, isInWishlist, onWishlistToggle, onAddToCart}: Props) => {
    const {t} = useLanguage();
    const imageUrl = product.images?.[0]?.imageUrl;
    const altText = product.images?.[0]?.altText;
    const price = product.sellingPrice ?? 0;

    const isLong = (text?: string) => (text ? text.length > 30 : false);

    return (
        <Card sx={{
            width: 300,
            m: 1,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 3,
            },
        }}>
            <Link to={`/products/${product.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                <CardMedia
                    component="img"
                    height="200"
                    image={imageUrl}
                    alt={altText}
                />
            </Link>
            <CardContent>
                <Tooltip title={isLong(product.name) ? product.name : ''}>
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{
                            height: 56,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {product.name}
                    </Typography>
                </Tooltip>

                <Tooltip title={isLong(product.categoryName) ? product.categoryName : ''}>
                    <Typography variant="body2" color="text.secondary">
                        {t.product.category}: {product.categoryName || t.product.unknownCategory}
                    </Typography>
                </Tooltip>

                <Tooltip title={isLong(product.brandName) ? product.brandName : ''}>
                    <Typography variant="body2" color="text.secondary">
                        {t.product.brand}: {product.brandName || t.product.unknownBrand}
                    </Typography>
                </Tooltip>

                <Typography variant="subtitle1" color="primary">
                    {t.product.price}: ${price?.toString()}
                </Typography>
            </CardContent>

            <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => onAddToCart(product.id!)}
                >
                    {t.product.addToCart}
                </Button>
                <Tooltip title={isInWishlist ? t.product.removeFromWishlist : t.product.addToWishlist}>
                    <IconButton onClick={() => onWishlistToggle(product.id!)}>
                        {isInWishlist ? (
                            <Favorite color="error"/>
                        ) : (
                            <FavoriteBorder/>
                        )}
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    );
}
export default ProductCard;