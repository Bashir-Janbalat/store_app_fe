import {useWishlist} from "./useWishlist";
import type {ProductDTO} from "../types/product";
import toast from "react-hot-toast";
import type {CartItem} from "../types/cart.ts";

export const useWishlistActions = () => {
    const {items: wishlistItems, addToWishlist, removeFromWishlist} = useWishlist();

    const isInWishlist = (productId?: number) =>
        Array.isArray(wishlistItems) && wishlistItems.some(item => item.productId === productId);

    const isProductDTO = (obj: ProductDTO | CartItem): obj is ProductDTO => {
        return "images" in obj && Array.isArray(obj.images);
    };

    const handleToggleWishlist = (item: ProductDTO | CartItem) => {
        if (isProductDTO(item)) {
            const { id, sellingPrice, images, name, description } = item;

            if (!id || !sellingPrice || images.length === 0) {
                toast.error("Invalid product data");
                return;
            }

            if (isInWishlist(id)) {
                removeFromWishlist(id);
            } else {
                addToWishlist(
                    {
                        name,
                        imageUrl: images[0].imageUrl,
                        description,
                    },
                    id,
                    sellingPrice
                );
            }

        } else {
            const { productId, product, unitPrice } = item;

            if (isInWishlist(productId)) {
                removeFromWishlist(productId);
            } else {
                addToWishlist(
                    product,
                    productId,
                    unitPrice
                );
            }
        }
    };

    return {isInWishlist, handleToggleWishlist};
};
