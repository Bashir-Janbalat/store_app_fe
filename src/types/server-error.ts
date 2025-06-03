export class DetailedApiError extends Error {
    status?: number;
    path?: string;
    timestamp?: string;

    constructor(message: string, status?: number, path?: string, timestamp?: string) {
        super(message);
        this.name = "DetailedApiError";
        this.status = status;
        this.path = path;
        this.timestamp = timestamp;
    }
}
export interface ServerErrorResponse {
    timestamp: string;
    message: string;
    status: number;
    error: string;
    path: string;
}

