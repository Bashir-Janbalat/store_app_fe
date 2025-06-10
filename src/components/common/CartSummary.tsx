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
import {Link} from 'react-router-dom';
import {useWishlistActions} from "../../hooks/useWishlistActions.ts";

const CartSummary = () => {
    const {t} = useLanguage();
    const {items, removeFromCart, clearCart, updateQuantity} = useCart();
    const MAX_QUANTITY = 100;
    const {isInWishlist, handleToggleWishlist} = useWishlistActions();


    const total = items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

    return (
        <>
            <Box className="summary-container">
                <Typography variant="h6" gutterBottom>
                    {t.cart.title}
                </Typography>
                {items.length === 0 ? (
                    <Typography variant="body1" color="text.secondary">
                        {t.cart.emptyCartDescription}
                    </Typography>
                ) : (
                    <>
                        <List className={"item-list"}>
                            {items.map((item) => {
                                const subTotal = item.unitPrice * item.quantity;
                                return (
                                    <ListItem key={item.productId} className="item">
                                        <Box className="item-content">
                                            <Box className="item-info">
                                                {/*  الصورة والوصف والسعر */}
                                                <Box className="item-row">
                                                    <ListItemAvatar>
                                                        <Link to={`/products/${item.productId}`} className="item-link">
                                                            <Avatar
                                                                variant="square"
                                                                src={item.product.imageUrl}
                                                                alt={item.product.name}
                                                                sx={{
                                                                    width: 64, height: 64, mr: 2,
                                                                    border: "2px solid #1976d2",
                                                                    boxSizing: "border-box",
                                                                    borderRadius: 1,
                                                                }}
                                                            />
                                                        </Link>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={item.product.name}
                                                        secondary={
                                                            <Typography variant="body2" color="text.secondary">
                                                                {item.product.description}
                                                            </Typography>
                                                        }
                                                    />
                                                    <Typography className={"price-text"}>
                                                        {item.unitPrice.toFixed(2)} €
                                                    </Typography>
                                                </Box>
                                                {/*   الكمية والحذف والأضافة الى الأمنيات والسعر للكمية*/}
                                                <Box className={"item-actions"}>
                                                    <Button
                                                        sx={{minWidth: 25, height: 25, mt: 1}}
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                                                    >
                                                        -
                                                    </Button>
                                                    <Typography sx={{px: 1, mt: 1}}>{item.quantity}</Typography>
                                                    <Button
                                                        sx={{minWidth: 25, height: 25, mt: 1}}
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={() => updateQuantity(item.productId, Math.min(MAX_QUANTITY, item.quantity + 1))}
                                                    >
                                                        +
                                                    </Button>
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
                                                    {/*عرض المجموع الفرعي للعنصر*/}
                                                    <Typography sx={{ml: 2, mt: 1}}>
                                                        {subTotal.toFixed(2)} €
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </ListItem>
                                );
                            })}
                        </List>

                        {/* عرض المجموع الكلي */}
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
        </>
    );
};

export default CartSummary;
