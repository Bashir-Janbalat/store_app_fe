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
import {useLanguage} from "../hooks/useLanguage.ts";
import { handleErrorToast } from "../utils/error-utils.ts";
import axios from "axios";


export const CartProvider = ({children}: { children: ReactNode }) => {
    const {t} = useLanguage();
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
        refetchKey: cartKey
    });

    const updateQuantityMutation = useApiMutation<void, UpdateCartRequest>({
        method: "put",
        url: "/cart/update-quantity",
        api: ApiType.STORE,
        refetchKey: cartKey,
        onSuccess: () => {
            toast.success(t.cart.update.success);
        },
        onError: (error) => {
            handleErrorToast(error, t.cart.update.error, toast.error);
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
            toast.success(t.cart.removed.success);
        },
        onError: (error) => {
            handleErrorToast(error, t.cart.removed.error, toast.error);
        },
    });

    const clearCartMutation = useApiMutation<void, undefined>({
        method: "delete",
        url: "/cart/clear",
        api: ApiType.STORE,
        refetchKey: cartKey,
        sendPayload: false,
        onSuccess: () => {
            toast.success(t.cart.clear.success);
        },
        onError: (error) => {
            handleErrorToast(error, t.cart.clear.error, toast.error);
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
        const existing = items.find(item => item.productId === productId);

        setItems(prevItems =>
            existing
                ? prevItems.map(item =>
                    item.productId === productId
                        ? {...item, quantity: item.quantity + quantity}
                        : item
                )
                : [...prevItems, {productId, quantity, unitPrice, product}]
        );

        addToCartMutation.mutate({
            productId,
            unitPrice,
            quantity,
        }, {
            onSuccess: () => {
                if (existing) {
                    toast.success(t.cart.add.updated);
                } else {
                    toast.success(t.cart.add.success);
                }
            },
            onError: (error) => {
                setItems(prevItems => {
                    if (existing) {
                        return prevItems.map(item =>
                            item.productId === productId
                                ? {...item, quantity: item.quantity - quantity}
                                : item
                        );
                    } else {
                        return prevItems.filter(item => item.productId !== productId);
                    }
                });
                if (axios.isAxiosError(error)) {
                    const message = error.response?.data?.message ?? t.cart.add.error;
                    if (message.includes("Out of stock")) {
                        toast.error(t.cart.outOfStockMessage);
                    } else {
                        toast.error(message);
                    }
                } else if (error instanceof Error) {
                    toast.error(`${t.cart.add.error}: ${error.message}`);
                } else {
                    toast.error(t.cart.add.error);
                }
            }
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