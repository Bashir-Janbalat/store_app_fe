import {jwtDecode} from "jwt-decode";
import type {JwtPayload} from "../types/auth.ts";

const TOKEN_KEY = 'access_token';

export const saveToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp ? decoded.exp < currentTime : true;
    } catch (error) {
        console.error(error);
        return true;
    }
};


export const getSubjectFromToken = (token: string): string | null => {
    if (!token) return null;
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.sub || null;
    } catch (error) {
        console.error('Error decoding token subject:', error);
        return null;
    }
};

export const getUserFromToken = (): JwtPayload | null => {
    const token = getToken();
    if (!token || isTokenExpired(token)) return null;

    try {
        return jwtDecode<JwtPayload>(token);
    } catch (error) {
        console.error('Error decoding user from token:', error);
        return null;
    }
};

