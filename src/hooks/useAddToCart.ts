import {useCart} from "./useCart";
import toast from "react-hot-toast";
import type {ImageDTO} from "../types/product";

export const useAddToCart = () => {
    const {addToCart} = useCart();

    const handleAddToCart = (id: number, name: string, description: string, sellingPrice: number, images: ImageDTO[]) => {
        if (!id || !sellingPrice || !images.length) {
            toast.error("Invalid product data");
            return;
        }
        addToCart(
            {
                name: name,
                imageUrl: images[0].imageUrl,
                description: description,
            },
            id,
            sellingPrice
        );
    };

    return {handleAddToCart};
};
