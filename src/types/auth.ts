export interface JwtPayload {
    id: number;
    email: string;
    name: string;
    phone: string;
    countryCode: string;
    dialCode: string;
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
export interface UpdateProfileInput {
    name: string;
    phone: string;
    dialCode: string;
    countryCode: string;
}