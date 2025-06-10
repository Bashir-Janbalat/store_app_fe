import {useContext} from "react";
import type {WishlistContextType} from "../types/wishlist.ts";
import {WishlistContext} from "../context/WishlistContext.tsx";

export const useWishlist = (): WishlistContextType => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};