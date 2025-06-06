import {createContext} from "react";
import type {CartContextType} from "../types/cart.ts";


export const CartContext = createContext<CartContextType | undefined>(undefined);