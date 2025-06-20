import {type ReactNode, useEffect, useState} from "react";
import type {AddToCartRequest, CartDTO, CartItem, UpdateCartRequest} from "../types/cart.ts";
import {CartContext} from "./CartContext.tsx";
import {toast} from "react-hot-toast";
import {useAuth} from "../hooks/useAuth.ts";
import LoadingSkeleton from "../components/common/LoadingSkeleton.tsx";
import ErrorFallback from "../components/common/ErrorFallback.tsx";
import {useQueryToast} from "../hooks/useQueryToast.ts";
import {useFetchData} from "../hooks/useFetchData.ts";
import {ApiType} from "../types/common.ts";
import {useApiMutation} from "../hooks/useApiMutation.ts";
import {getSessionId} from "../utils/session-utils.ts";


export const CartProvider = ({children}: { children: ReactNode }) => {
    const [cartId, setCartId] = useState<number | undefined>(undefined);
    const [items, setItems] = useState<CartItem[]>([]);
    const {user} = useAuth();
    const cartKey = user ? `cart:${user.id}` : `cart:${getSessionId()}`;

    const query = useFetchData<CartDTO>(ApiType.STORE, cartKey, `/cart`);
    const {data, isLoading, isError, retryWithToast} = useQueryToast(query, {showLoading: true});

    const addToCartMutation = useApiMutation<CartItem[], AddToCartRequest>({
        method: "post",
        url: "/cart/add",
        api: ApiType.STORE,
        refetchKey: cartKey,
        onSuccess: (updatedItems) => {
            setItems(updatedItems);
            toast.success("Added to cart");
        },
        onError: (error) => {
            toast.error("Failed to add to cart: " + error.message);
        },
    });

    const updateQuantityMutation = useApiMutation<void, UpdateCartRequest>({
        method: "put",
        url: "/cart/update-quantity",
        api: ApiType.STORE,
        refetchKey: cartKey,
        onSuccess: () => {
            toast.success("Quantity updated");
        },
        onError: (error) => {
            toast.error("Failed to Update Quantity : " + error.message);
        },
    });
    const removeFromCartMutation = useApiMutation<void, { productId: number }>({
        method: "delete",
        url: "/cart/remove",
        api: ApiType.STORE,
        refetchKey: cartKey,
        buildUrlFn: (url, payload) => {
            const params = new URLSearchParams();
            params.append("productId", String(payload.productId));
            return `${url}?${params.toString()}`;
        },
        sendPayload: false,
        onSuccess: () => {
            toast.success("Item removed from cart");
        },
        onError: (error) => {
            toast.error("Failed to remove item: : " + error.message);
        },
    });

    const clearCartMutation = useApiMutation<void, undefined>({
        method: "delete",
        url: "/cart/clear",
        api: ApiType.STORE,
        refetchKey: cartKey,
        sendPayload: false,
        onSuccess: () => {
            toast.success("Cart cleared");
        },
        onError: (error) => {
            toast.error("Failed to clear Cart: : " + error.message);
        },
    });

    useEffect(() => {
        if (data) {
            setItems(data.itemDTOS);
            setCartId(data.cartId);
        } else {
            setItems([]);
            setCartId(undefined);
        }
    }, [data]);


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
                return [...prevItems, {productId, quantity, unitPrice, product}];
            }
        });
        addToCartMutation.mutate({
            productId,
            unitPrice,
            quantity,
        });
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
        updateQuantityMutation.mutate({productId, quantity: newQuantity});
    };

    const removeFromCart = (productId: number) => {
        setItems((prevItems) => prevItems.filter(item => item.productId !== productId));
        removeFromCartMutation.mutate({productId});
    };

    const clearCart = () => {
        setItems([]);
        clearCartMutation.mutate(undefined);
    };


    return (
        <CartContext.Provider value={{cartId, items, addToCart, removeFromCart, clearCart, updateQuantity}}>
            {children}
        </CartContext.Provider>
    );
};