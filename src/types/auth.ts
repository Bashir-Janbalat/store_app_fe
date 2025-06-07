export interface SignInResponse {
    accessToken: string;
}

export interface JwtPayload {
    id: number;
    email: string;
    name: string;
    roles: string[];
}

export interface SignUp {
    email: string;
    password: string;
    name: string;
    phone?: string;
}

export interface PasswordResetRequest {
    token: string;
    newPassword: string;
}
