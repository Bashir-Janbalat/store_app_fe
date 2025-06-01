import axiosInstance from './axiosInstance';
import type {LoginResponse} from "../types/auth";


export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axiosInstance.post('/auth/login', {
            email,
            password,
        });
        return response.data as LoginResponse;
    } catch (error) {
        throw error;
    }
};