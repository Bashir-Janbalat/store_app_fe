import {type ReactNode, useEffect, useState} from "react";
import type {WishlistItem} from "../types/wishlist.ts";
import {useAuth} from "../hooks/useAuth";
import {getSessionId} from "../utils/session-utils.ts";
import {ApiType} from "../types/common.ts";
import {useFetchData} from "../hooks/useFetchData.ts";
import {useQueryToast} from "../hooks/useQueryToast.ts";
import LoadingSkeleton from "../components/common/LoadingSkeleton.tsx";
import ErrorFallback from "../components/common/ErrorFallback.tsx";
import {useApiMutation} from "../hooks/useApiMutation.ts";
import toast from "react-hot-toast";
import {WishlistContext} from "./WishlistContext.tsx";

export const WishlistProvider = ({children}: { children: ReactNode }) => {
    const [items, setItems] = useState<WishlistItem[]>([]);
    const {user} = useAuth();
    const wishlistKey = user ? `wishlist:${user.id}` : `wishlist:${getSessionId()}`;

    const query = useFetchData<WishlistItem[]>(ApiType.STORE, wishlistKey, `/wishlist/items`);
    const {data, isLoading, isError, retryWithToast} = useQueryToast(query, {showLoading: true});

    useEffect(() => {
        if (Array.isArray(data)) {
            setItems(data);
        } else {
            setItems([]);
        }
    }, [data,wishlistKey]);



    const addToWishlistMutation = useApiMutation<WishlistItem[], { productId: number }>({
        method: "post",
        url: "/wishlist/add",
        api: ApiType.STORE,
        refetchKey: wishlistKey,
        onSuccess: (updatedItems) => {
            setItems(updatedItems);
            toast.success("Added to wishlist");
        },
        onError: (error) => {
            toast.error("Failed to add to wishlist: " + error.message);
        },
    });

    const removeFromWishlistMutation = useApiMutation<void, { productId: number }>({
        method: "delete",
        url: "/wishlist/remove",
        api: ApiType.STORE,
        refetchKey: wishlistKey,
        sendPayload: false,
        buildUrlFn: (url, payload) => `${url}?productId=${payload.productId}`,
        onSuccess: () => {
            toast.success("Item removed from wishlist");
        },
        onError: (error) => {
            toast.error("Failed to remove item: " + error.message);
        },
    });

    const clearWishlistMutation = useApiMutation<void, undefined>({
        method: "delete",
        url: "/wishlist/clear",
        api: ApiType.STORE,
        refetchKey: wishlistKey,
        sendPayload: false,
        onSuccess: () => {
            toast.success("Wishlist cleared");
        },
        onError: (error) => {
            toast.error("Failed to clear Wishlist: " + error.message);
        },
    });

    const addToWishlist = (product: WishlistItem["product"], productId: number, unitPrice: number) => {
        setItems(prevItems => {
            if (prevItems.find(item => item.productId === productId)) {
                return prevItems;
            }
            return [...prevItems, {productId, unitPrice, product}];
        });

        addToWishlistMutation.mutate({productId});
    };

    const removeFromWishlist = (productId: number) => {
        setItems(prevItems => prevItems.filter(item => item.productId !== productId));
        removeFromWishlistMutation.mutate({productId});
    };
    const clearWishlist = () => {
        setItems([]);
        clearWishlistMutation.mutate(undefined);
    };

    if (isLoading) return <LoadingSkeleton/>;
    if (isError) return <ErrorFallback onRetry={retryWithToast}/>;
    return (
        <WishlistContext.Provider value={{items, addToWishlist, removeFromWishlist, clearWishlist}}>
            {children}
        </WishlistContext.Provider>
    );

}