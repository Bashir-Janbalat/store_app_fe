import type {ProductInfo} from "./product";

export interface CartDTO {
    cartId: number;
    itemDTOS: CartItem[];
}

export interface CartItem {
    productId: number;
    quantity: number;
    unitPrice: number;
    product: ProductInfo;
}

export interface CartContextType {
    cartId: number | undefined;
    items: CartItem[];
    addToCart: (product: {
        name: string,
        description?: string,
        imageUrl: string,
        totalStock: number,
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