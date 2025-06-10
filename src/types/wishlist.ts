import type {ProductInfo} from "./product";

export interface WishlistItem {
    productId: number;
    unitPrice: number;
    product: ProductInfo;
}

export interface WishlistContextType {
    items: WishlistItem[];
    addToWishlist: (product: {
        name: string;
        description?: string;
        imageUrl: string
    }, productId: number, unitPrice: number) => void;
    removeFromWishlist: (productId: number) => void;
    clearWishlist: () => void;
}