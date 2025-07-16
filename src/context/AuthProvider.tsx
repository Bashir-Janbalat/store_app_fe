import React, {type ReactNode, useEffect, useState} from "react";
import {AuthContext} from "./AuthContext.tsx";
import {
    fetchCurrentUser,
    resetPassword,
    sendResetLink,
    signInUser,
    signOutUser,
    signupUser,
    updateUserProfile
} from "../services/authService.ts";
import type {JwtPayload, PasswordResetRequest, SignUp, UpdateProfileInput} from "../types/auth.ts";
import {isLoggedIn, removeLoggedIn, resetSessionId, saveLoggedIn} from "../utils/session-utils.ts";
import {setLogoutHandler} from "../api/storeApi.ts";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<JwtPayload | null>(null);
    useEffect(() => {
        if (isLoggedIn()) {
            fetchCurrentUser()
                .then(userData => {
                    setUser(userData);
                    saveLoggedIn(true);
                })
                .catch(() => {
                    setUser(null);
                    removeLoggedIn();
                });
        } else {
            setUser(null);
        }
    }, []);

    useEffect(() => {
        setLogoutHandler(async () => {
            await signOut();
        });
    }, []);

    const signIn = async (email: string, password: string) => {
        await signInUser(email, password);
        saveLoggedIn(true);
        const userData = await fetchCurrentUser();
        setUser(userData);
    };

    const signOut = async () => {
        await signOutUser();
        resetSessionId();
        setUser(null);
        saveLoggedIn(false);
    };

    const signUp = async (signUp: SignUp) => {
        return await signupUser(signUp);
    };

    const updateProfile = async (profile: UpdateProfileInput) => {
        const updated = await updateUserProfile(profile);
        setUser(updated);
    };

    const sendResetLinkFor = async (email: string) => {
        return await sendResetLink(email);
    };

    const resetPasswordFor = async (passwordResetRequest: PasswordResetRequest) => {
        return await resetPassword(passwordResetRequest);
    };

    return (
        <AuthContext.Provider
            value={{user, signIn, signUp, signOut, updateProfile, sendResetLinkFor, resetPasswordFor}}
        >
            {children}
        </AuthContext.Provider>
    );
};
