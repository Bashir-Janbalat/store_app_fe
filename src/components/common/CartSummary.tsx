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

const CartSummary = () => {
    const {t} = useLanguage();
    const {items, removeFromCart, clearCart, updateQuantity} = useCart();
    const MAX_QUANTITY = 10;

    const total = items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

    return (
        <>
            <Box>
                <Typography variant="h6" gutterBottom>
                    {t.cart.title}
                </Typography>
                {items.length === 0 ? (
                    <Typography variant="body1" color="text.secondary">
                        {t.cart.emptyCartDescription}
                    </Typography>
                ) : (
                    <>
                        <List sx={{border: "1px solid #ddd", borderRadius: 2, bgcolor: "background.paper"}}>
                            {items.map((item) => {
                                const subTotal = item.unitPrice * item.quantity;
                                return (
                                    <ListItem key={item.productId} sx={{display: "flex", alignItems: "center", py: 1}}>
                                        {/* جهة الصورة والوصف */}
                                        <Box sx={{flex: 1, display: "flex", alignItems: "center"}}>
                                            <ListItemAvatar>
                                                <Avatar
                                                    variant="square"
                                                    src={item.product.imageUrl}
                                                    alt={item.product.name}
                                                    sx={{width: 64, height: 64, mr: 2}}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item.product.name}
                                                secondary={
                                                    <Typography variant="body2" color="text.secondary">
                                                        {item.product.description}
                                                    </Typography>
                                                }
                                            />
                                        </Box>

                                        {/* عرض سعر الوحدة */}
                                        <Typography sx={{width: 80, textAlign: "right", mr: 2}}>
                                            {item.unitPrice.toFixed(2)} €
                                        </Typography>

                                        {/* جهة الكمية والحذف */}
                                        <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                                            <Button
                                                sx={{minWidth: 32, height: 32, p: 0}}
                                                variant="outlined"
                                                size="small"
                                                onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                                            >
                                                -
                                            </Button>

                                            <Typography variant="body1" sx={{minWidth: 24, textAlign: "center"}}>
                                                {item.quantity}
                                            </Typography>

                                            <Button
                                                sx={{minWidth: 32, height: 32, p: 0}}
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
                                            <Tooltip title={t.cart.addToWishList}>
                                                <IconButton>
                                                    <FavoriteBorderIcon/>
                                                </IconButton>
                                            </Tooltip>
                                        </Box>

                                        {/* عرض المجموع الفرعي للعنصر */}
                                        <Typography sx={{width: 80, textAlign: "right", ml: 2}}>
                                            {subTotal.toFixed(2)} €
                                        </Typography>
                                    </ListItem>
                                );
                            })}
                        </List>

                        {/* عرض المجموع الكلي */}
                        <Box sx={{textAlign: "right", mt: 2, mr: 2}}>
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
