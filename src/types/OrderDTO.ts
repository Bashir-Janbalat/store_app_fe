import type {ProductInfo} from "./product";
import type {Address} from "./customer.ts";

interface OrderItemDTO {
    productId: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    productInfo?: ProductInfo;
}

export interface OrderDTO {
    customerId: number;
    cartId: number | undefined;
    shippingAddressId: number;
    billingAddressId: number;
    shippingAddress: Address;
    billingAddress: Address;
    status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
    totalAmount: number;
    items: OrderItemDTO[];
}

export interface OrderResponseCreatedDTO {
    orderId: number;
    totalAmount: number;
}