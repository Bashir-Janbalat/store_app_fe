import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Tooltip,
    Typography
} from '@mui/material';
import {AddShoppingCart, Favorite, FavoriteBorder} from '@mui/icons-material';
import type {ImageDTO, ProductDTO} from "../../types/product.ts";
import {useLanguage} from "../../hooks/useLanguage.ts";
import {Link} from 'react-router-dom';

interface Props {
    product: ProductDTO;
    isInWishlist: boolean;
    onWishlistToggle: (productId: number) => void;
    onAddToCart: (name: string, images: ImageDTO[], description: string, totalStock: number, id: number, sellingPrice: number) => void;
}

const ProductCard = ({product, isInWishlist, onWishlistToggle, onAddToCart}: Props) => {
    const {t} = useLanguage();
    const imageUrl = product.images?.[0]?.imageUrl;
    const altText = product.images?.[0]?.altText;
    const price = product.sellingPrice ?? 0;
    const totalStock = product.stocks?.reduce((sum, stock) => sum + stock.quantity, 0) ?? 0;

    const isLong = (text?: string) => (text ? text.length > 30 : false);

    return (
        <Grid container sx={{position: 'relative', '&:hover .stock-badge': {opacity: 1}}}>
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
                    {/* الشارة تظهر فقط في حالة hover */}
                    <Box
                        className="stock-badge"
                        sx={{
                            position: 'absolute',
                            top: 8,
                            left: 8,
                            backgroundColor:
                                totalStock === 0
                                    ? 'rgba(200, 0, 0, 0.7)'
                                    : totalStock <= 3
                                        ? 'rgba(255, 165, 0, 0.8)'
                                        : 'rgba(0, 128, 0, 0.7)',
                            color: '#fff',
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            fontSize: 12,
                            zIndex: 1,
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                        }}
                    >
                        {totalStock === 0
                            ? t.product.outOfStock
                            : totalStock <= 3
                                ? `${t.product.lowStock}: ${totalStock}`
                                : `${t.product.inStock}: ${totalStock}`}
                    </Box>

                    <CardMedia
                        component="img"
                        height="200"
                        image={imageUrl}
                        alt={altText}
                    />

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
                            {t.product.price}: {price?.toString()}{t.common.currency}
                        </Typography>
                    </CardContent>
                </Link>

                <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        endIcon={<AddShoppingCart/>}
                        onClick={() => onAddToCart(product.name, product.images, product.description!, totalStock, product.id!, product.sellingPrice!)}
                        disabled={totalStock === 0}
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
        </Grid>
    );
}

export default ProductCard;
