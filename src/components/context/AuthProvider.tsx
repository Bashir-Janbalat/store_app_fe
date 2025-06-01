import React, {type ReactNode, useState} from "react";
import {AuthContext} from "./AuthContext";
import {loginUser} from "../services/authService.ts";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [token, setToken] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        const response = await loginUser(email, password);
        setToken(response.accessToken);
        localStorage.setItem("token", response.accessToken);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{token, login, logout, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};
