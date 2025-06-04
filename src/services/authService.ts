import storeApi from '../api/storeApi.ts';
import type {PasswordResetRequest, SignInResponse, SignUp} from "../types/auth.ts";
import {getDetailedApiError} from "../utils/error-utils.ts";


export const signInUser = async (email: string, password: string): Promise<SignInResponse> => {
    try {
        const response = await storeApi.post('/auth/login', {
            email,
            password,
        });
        return response.data as SignInResponse;
    } catch (error) {
        throw getDetailedApiError(error);
    }
};

export const signupUser = async (user: SignUp): Promise<number> => {
    try {
        const response = await storeApi.post('/auth/signup', user);
        return response.status;
    } catch (error) {
        throw getDetailedApiError(error);
    }
};

export const sendResetLink = async (email: string): Promise<number> => {
    try {
        const encodedEmail = encodeURIComponent(email);
        const response = await storeApi.post(`/auth/send-reset-link?email=${encodedEmail}`);
        return response.status;
    } catch (error) {
        throw getDetailedApiError(error);
    }
}

export const resetPassword = async (request: PasswordResetRequest): Promise<number> => {
    try {
        const response = await storeApi.post(`/auth/reset-password`, request);
        return response.status;
    } catch (error) {
        throw getDetailedApiError(error);
    }
}