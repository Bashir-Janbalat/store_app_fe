import {createContext} from "react";
import type {JwtPayload, PasswordResetRequest, SignUp} from "../types/auth.ts";

interface AuthContextType {
    user: JwtPayload | null;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (signUp: SignUp) => Promise<number>;
    signOut: () => void;
    sendResetLinkFor: (email: string) => Promise<number>;
    resetPasswordFor: (passwordResetRequest: PasswordResetRequest) => Promise<number>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
