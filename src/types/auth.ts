export interface SignInResponse {
    accessToken: string;
}

export interface JwtPayload {
    sub: string;
    roles: { authority: string }[];
    iat: number;
    exp: number;
    id: number;
    name: string;
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
