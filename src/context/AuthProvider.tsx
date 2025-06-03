import React, {type ReactNode, useEffect, useState} from "react";
import {AuthContext} from "./AuthContext.tsx";
import {resetPassword, sendResetLink, signInUser, signupUser} from "../services/authService.ts";
import type {JwtPayload, PasswordResetRequest, SignUp} from "../types/auth.ts";
import {getUserFromToken, removeToken, saveToken} from "../utils/jwt-utils.ts";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<JwtPayload | null>(null);

    useEffect(() => {
        const decodedUser = getUserFromToken();
        setUser(decodedUser);
    }, []);

    const signIn = async (email: string, password: string) => {
        const response = await signInUser(email, password);
        const token = response.accessToken;
        saveToken(token);
        const decoded = getUserFromToken();
        setUser(decoded);
    };

    const signOut = () => {
        removeToken();
        setUser(null);
    };

    const signUp = async (signUp: SignUp) => {
        const status = await signupUser(signUp);

        if (status === 201) {
            const response = await signInUser(signUp.email, signUp.password);
            const token = response.accessToken;

            saveToken(token);
            const decoded = getUserFromToken();
            setUser(decoded);
        }

        return status;
    };

    const sendResetLinkFor = async (email: string) => {
        return await sendResetLink(email);
    };
    const resetPasswordFor = async (passwordResetRequest: PasswordResetRequest) => {
        return await resetPassword(passwordResetRequest)
    }

    return (
        <AuthContext.Provider value={{user, signIn, signUp, signOut, sendResetLinkFor, resetPasswordFor}}>
            {children}
        </AuthContext.Provider>
    );
};
