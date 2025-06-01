import axios from "axios";
import {DetailedApiError, type ServerErrorResponse} from "../types/error.ts";

export function getDetailedApiError(error: unknown): DetailedApiError {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            const {status, statusText, data} = error.response;
            const serverResponse = data as ServerErrorResponse;
            const message = serverResponse.message || statusText || data || 'Unknown server error';
            const path = serverResponse.path || '';
            const timestamp = serverResponse.timestamp || new Date().toISOString();
            return new DetailedApiError(message, status, path, timestamp);
        }

        if (error.request) {
            return new DetailedApiError(
                'Server not reachable. Please try again later or check your internet connection.',
                500,
                error.request?.path || '',
                new Date().toISOString()
            );
        }

        return new DetailedApiError('An unexpected error occurred.', 500, '', new Date().toISOString());
    }

    return new DetailedApiError('An unexpected error occurred. Please check your network connection and try again.', 500, '', new Date().toISOString());
}

export function handleSetError(error: unknown, setError: (msg: string) => void) {
    if (error instanceof Error) {
        setError(error.message);
    } else {
        setError('An unexpected error occurred');
    }
}