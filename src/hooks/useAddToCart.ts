import {useCart} from "./useCart";
import toast from "react-hot-toast";
import type {ImageDTO} from "../types/product";

export const useAddToCart = () => {
    const {addToCart} = useCart();

    const handleAddToCart = (name: string, images: ImageDTO[], description: string, totalStock: number, id: number, sellingPrice: number) => {
        if (!id || !sellingPrice || !images.length) {
            toast.error("Invalid product data");
            return;
        }
        addToCart(
            {
                name: name,
                imageUrl: images[0].imageUrl,
                description: description,
                totalStock: totalStock
            },
            id,
            sellingPrice
        );
    };

    return {handleAddToCart};
};
