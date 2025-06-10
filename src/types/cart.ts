import type { ProductInfo } from "./product";

export interface CartItem {
    productId: number;
    quantity: number;
    unitPrice: number;
    product: ProductInfo;
}

export interface CartContextType {
    items: CartItem[];
    addToCart: (product: {
        name: string;
        description?: string;
        imageUrl: string
    }, productId: number, unitPrice: number, quantity?: number) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    updateQuantity: (productId: number, quantity: number) => void;
}

export interface AddToCartRequest {
    productId: number;
    unitPrice: number;
    quantity: number;
}

export interface UpdateCartRequest {
    productId: number;
    quantity: number;
}