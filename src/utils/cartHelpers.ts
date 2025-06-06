import type { ProductDTO } from "../types/product";
import type {CartItem} from "../types/cart.ts";


export function mapProductToCartItem(product: ProductDTO): {
    product: CartItem["product"];
    productId: number;
    unitPrice: number;
} | null {
    if (!product.id || !product.sellingPrice || !product.images.length) {
        console.warn("Invalid product data");
        return null;
    }

    return {
        product: {
            name: product.name,
            imageUrl: product.images[0].imageUrl,
            description: product.description,
        },
        productId: product.id,
        unitPrice: product.sellingPrice,
    };
}
