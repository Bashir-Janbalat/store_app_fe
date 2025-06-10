import {Avatar, Box, Button, IconButton, List, ListItem, ListItemText, Tooltip, Typography} from "@mui/material";
import {useLanguage} from "../../hooks/useLanguage.ts";
import {useWishlist} from "../../hooks/useWishlist.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {Link} from 'react-router-dom';
import {useAddToCart} from "../../hooks/useAddToCart.ts";


const WishlistSummary = () => {
    const {t} = useLanguage();
    const {items: wishlistItems, removeFromWishlist, clearWishlist} = useWishlist();
    const {handleAddToCart} = useAddToCart();


    return (
        <>
            <Box className="summary-container">
                <Typography variant="h6" gutterBottom>
                    {t.wishlist.title}
                </Typography>
                {wishlistItems.length === 0 ? (
                    <Typography variant="body1" color="text.secondary">
                        {t.wishlist.emptyWishlistDescription}
                    </Typography>
                ) : (
                    <>
                        <List className="item-list">
                            {wishlistItems.map((item) => {
                                return (
                                    <ListItem key={item.productId} className="item">
                                        <Box className="item-content">
                                            {/* الصورة + الشرح + الحذف والأضافة */}
                                            <Box className="item-info">
                                                <Box className="item-row">
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
                                                    <ListItemText
                                                        primary={item.product.name}
                                                        secondary={
                                                            <Typography variant="body2" color="text.secondary">
                                                                {item.product.description}
                                                            </Typography>
                                                        }
                                                    />
                                                </Box>

                                                {/* زر الحذف أسفل الوصف مباشرة */}
                                                <Box className="item-actions">
                                                    <Tooltip title={t.wishlist.remove}>
                                                        <IconButton
                                                            onClick={() => removeFromWishlist(item.productId)}
                                                            size="small">
                                                            <DeleteIcon fontSize="small"/>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title={t.product.addToCart}>
                                                        <IconButton
                                                            onClick={() => handleAddToCart(item.productId!, item.product.name,
                                                                item.product.description!, item.unitPrice!, [{imageUrl: item.product.imageUrl}])}
                                                            size="small"
                                                            color="primary">
                                                            <AddShoppingCartIcon fontSize="small"/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </ListItem>
                                );
                            })}
                        </List>
                        <Box className="summary-actions">
                            <Button variant="outlined" color="error" onClick={clearWishlist}>
                                {t.wishlist.clearWishlist}
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </>
    )
}

export default WishlistSummary;