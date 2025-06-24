import storeApi from '../api/storeApi.ts';
import type {JwtPayload, PasswordResetRequest, SignUp, UpdateProfileInput} from "../types/auth.ts";
import {getDetailedApiError} from "../utils/error-utils.ts";
import {getSessionId, hasSessionId } from '../utils/session-utils.ts';

export const signInUser = async (email: string, password: string): Promise<void> => {
    try {
        const baseUrl = '/auth/login';
        const sessionId = hasSessionId() ? getSessionId() : null;
        const url = sessionId ? `${baseUrl}?sessionId=${sessionId}` : baseUrl;

        await storeApi.post(url, {
            email,
            password,
        });
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

export const updateUserProfile = async (data: UpdateProfileInput): Promise<JwtPayload> => {
    try {
        const response = await storeApi.put('/auth/me', data);
        return response.data as JwtPayload;
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

export const fetchCurrentUser = async (): Promise<JwtPayload> => {
    try {
        const response = await storeApi.get('/auth/me');  // endpoint يعيد بيانات المستخدم الحالي
        return response.data as JwtPayload;
    } catch (error) {
        throw getDetailedApiError(error);
    }
};


export const signOutUser = async (): Promise<void> => {
    try {
        await storeApi.post('/auth/logout');
    } catch (error) {
        throw getDetailedApiError(error);
    }
};
