import {
    Avatar,
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tooltip,
    Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useCart} from "../../hooks/useCart.ts";
import {useLanguage} from "../../hooks/useLanguage.ts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {Link, useNavigate} from 'react-router-dom';
import {useWishlistActions} from "../../hooks/useWishlistActions.ts";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import {toast} from "react-hot-toast";
import {useAuth} from "../../hooks/useAuth.ts";
import {getProductDescription} from "../../utils/common.ts";
import {useIsMobile} from "../../hooks/useIsMobile.ts";

const CartSummary = () => {
    const {t} = useLanguage();
    const isMobile = useIsMobile();
    const {user} = useAuth();
    const {items, removeFromCart, clearCart, updateQuantity} = useCart();
    const {isInWishlist, handleToggleWishlist} = useWishlistActions();
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (!user) {
            navigate("/login?redirectUrl=/checkout");
        } else {
            navigate("/checkout");
        }
    };

    const total = items.reduce((sum, item) => {
        return item.product.totalStock > 0
            ? sum + (item.unitPrice * item.quantity)
            : sum;
    }, 0);

    return (
        <Box className="summary-container">
            <Typography variant="h6" gutterBottom>
                {t.cart.title}
            </Typography>

            {items.length > 0 && (
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={handleCheckout}
                    startIcon={<ProductionQuantityLimitsIcon/>}
                    sx={{m: 2}}
                >
                    {t.cart.checkout}
                </Button>
            )}

            {items.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                    {t.cart.emptyCartDescription}
                </Typography>
            ) : (
                <>
                    <List className="item-list">
                        {items.map((item) => {
                            const subTotal = item.unitPrice * item.quantity;
                            const isOutOfStock = item.product.totalStock < 1;

                            return (
                                <ListItem key={item.productId} className="item">
                                    <Box className="item-content">
                                        <Box className="item-info" sx={{opacity: isOutOfStock ? 0.5 : 1}}>
                                            <Box className="item-row">
                                                <ListItemAvatar>
                                                    <Link to={`/products/${item.productId}`} className="item-link">
                                                        <Avatar
                                                            variant="square"
                                                            src={item.product.imageUrl}
                                                            alt={item.product.name}
                                                            sx={{
                                                                width: 64,
                                                                height: 64,
                                                                m: 2,
                                                                border: "2px solid #1976d2",
                                                                boxSizing: "border-box",
                                                                borderRadius: 1,
                                                                filter: isOutOfStock ? "grayscale(100%)" : "none"
                                                            }}
                                                        />
                                                    </Link>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={
                                                        <Typography
                                                            sx={{
                                                                textDecoration: isOutOfStock ? "line-through" : "none"
                                                            }}
                                                        >
                                                            {item.product.name}
                                                        </Typography>
                                                    }
                                                    secondary={
                                                        <Typography variant="body2" color="text.secondary">
                                                            {getProductDescription(item.product.description!, isMobile)}
                                                        </Typography>
                                                    }
                                                />
                                                <Box
                                                    className="price-text"
                                                    sx={{
                                                        textDecoration: isOutOfStock ? "line-through" : "none",
                                                        display: 'inline-flex',
                                                        pl: 1,
                                                    }}
                                                >
                                                    <Typography>{item.unitPrice.toFixed(2)}</Typography>
                                                    <Typography>{t.common.currency}</Typography>
                                                </Box>
                                            </Box>

                                            <Box className="item-actions">
                                                <Button
                                                    sx={{minWidth: 25, height: 25}}
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() => {
                                                        if (item.quantity > 1) {
                                                            updateQuantity(item.productId, item.quantity - 1);
                                                        }
                                                    }}
                                                    disabled={isOutOfStock}
                                                >
                                                    -
                                                </Button>
                                                <Typography sx={{px: 1}}>{item.quantity}</Typography>
                                                <Button
                                                    sx={{minWidth: 25, height: 25}}
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() => {
                                                        if (item.quantity >= item.product.totalStock) {
                                                            toast.error(t.cart.outOfStockMessage);
                                                        } else {
                                                            updateQuantity(item.productId, item.quantity + 1);
                                                        }
                                                    }}
                                                    disabled={isOutOfStock}
                                                >
                                                    +
                                                </Button>
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ml: 1 }}>
                                                    <Tooltip title={t.cart.remove}>
                                                        <IconButton onClick={() => removeFromCart(item.productId)}>
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title={isInWishlist(item.productId)}>
                                                        <IconButton onClick={() => handleToggleWishlist(item)}>
                                                            {isInWishlist(item.productId) ? (
                                                                <FavoriteIcon color="error"/>
                                                            ) : (
                                                                <FavoriteBorderIcon/>
                                                            )}
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                                {!isMobile && !isOutOfStock && (
                                                    <Typography sx={{ml: 2, display: 'inline-flex'}}>
                                                        {subTotal.toFixed(2)}
                                                    </Typography>
                                                )}
                                                {!isMobile && !isOutOfStock && (
                                                    <Typography sx={{display: 'inline-flex'}}>
                                                        {t.common.currency}
                                                    </Typography>
                                                )}
                                            </Box>

                                            {isOutOfStock && (
                                                <Typography
                                                    variant="body2"
                                                    color="error"
                                                    sx={{mt: 1}}
                                                >
                                                    {t.product.outOfStock}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                </ListItem>
                            );
                        })}
                    </List>

                    <Box sx={{textAlign: "right", m: 2}}>
                        <Typography variant="h6">
                            {t.cart.total}: {total.toFixed(2)} €
                        </Typography>
                    </Box>

                    <Box sx={{textAlign: "center", mt: 2}}>
                        <Button variant="outlined" color="error" onClick={clearCart}>
                            {t.cart.clearCart}
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default CartSummary;
