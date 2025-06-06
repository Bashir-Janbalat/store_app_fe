import {type ReactNode, useEffect, useState} from "react";
import type {CartItem} from "../types/cart.ts";
import {CartContext} from "./CartContext.tsx";
import {toast} from "react-hot-toast";
import {useAuth} from "../hooks/useAuth.ts";
import LoadingSkeleton from "../components/common/LoadingSkeleton.tsx";
import ErrorFallback from "../components/common/ErrorFallback.tsx";
import { useQueryToast } from "../hooks/useQueryToast.ts";
import { useFetchData } from "../hooks/useFetchData.ts";
import { ApiType } from "../types/common.ts";


export const CartProvider = ({children}: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const {user} = useAuth();

    const query = useFetchData<CartItem[]>(ApiType.STORE, `cart:${user?.id}`, `/cart/items`);
    const {data, isLoading, isError, retryWithToast} = useQueryToast(query, {showLoading: true});

    useEffect(() => {
        if (!user) return;
        if (data)
            setItems(data);
    }, [user, data]);

    if (isLoading) return <LoadingSkeleton/>;
    if (isError) return <ErrorFallback onRetry={retryWithToast}/>;

    const addToCart = (product: CartItem["product"], productId: number, unitPrice: number, quantity = 1) => {
        setItems((prevItems) => {
            const existing = prevItems.find(item => item.productId === productId);
            if (existing) {
                return prevItems.map(item =>
                    item.productId === productId
                        ? {
                            ...item,
                            quantity: item.quantity + quantity,
                        }
                        : item
                );
            } else {
                return [...prevItems, {productId, quantity, unitPrice, subTotal: unitPrice * quantity, product}];
            }
        });
        toast.success("Added to cart");
    };

    const removeFromCart = (productId: number) => {
        setItems((prevItems) => prevItems.filter(item => item.productId !== productId));
        toast.success("Removed from cart");
    };

    const clearCart = () => {
        setItems([]);
        toast.success("Cart cleared");
    };

    const updateQuantity = (productId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        setItems(prevItems =>
            prevItems.map(item =>
                item.productId === productId
                    ? {
                        ...item,
                        quantity: newQuantity,
                    }
                    : item
            )
        );
    };

    return (
        <CartContext.Provider value={{items, addToCart, removeFromCart, clearCart, updateQuantity}}>
            {children}
        </CartContext.Provider>
    );
};