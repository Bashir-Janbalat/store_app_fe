import axios, {AxiosError, type InternalAxiosRequestConfig} from 'axios';
import logger from '../utils/Logger';
import Cookies from "js-cookie";


interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

const refreshClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL_STORE,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
});

const storeApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL_STORE,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

let logoutFromContext: (() => void) | null = null;

export const setLogoutHandler = (handler: () => void) => {
    logger.log('[Auth] Logout handler registered.');
    logoutFromContext = handler;
};

let isRefreshing = false;
let failedQueue: {
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: unknown): void => {
    logger.log('[Auth] Processing request queue after token refresh.');
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    failedQueue = [];
};
const MAX_RETRY_COUNT = 3;

const refreshAccessToken = async (): Promise<void> => {
    logger.log('[Auth] Attempting to refresh access token...');
    let attempt = 0;

    while (attempt < MAX_RETRY_COUNT) {
        attempt++;
        try {
            const res = await refreshClient.post('/auth/refresh-token');
            logger.log(`[Auth] Refresh token success on attempt ${attempt}`);
            if (res.status === 200) return;
        } catch (err) {
            logger.warn(`[Auth] Refresh token failed on attempt ${attempt}`);
            if (attempt >= MAX_RETRY_COUNT) throw err;
        }
    }
};

storeApi.interceptors.request.use(
    (config) => {
        const csrfToken = Cookies.get('XSRF-TOKEN');
        if (csrfToken) {
            config.headers['X-XSRF-TOKEN'] = csrfToken;
        }
        return config;
    },
    (error: unknown) => Promise.reject(error)
);

storeApi.interceptors.response.use(
    (response) => {
        logger.log(`Successful response: ${response.config.url}`);
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;
        logger.warn(`Error occurred on: ${originalRequest?.url}`);

        if (
            error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes('/auth/login')
        ) {
            console.warn('[Auth] Received 401, token might be expired.');
            originalRequest._retry = true;
            if (isRefreshing) {
                logger.log('[Auth] Token refresh already in progress. Queuing request...');
                return new Promise((resolve, reject) => {
                    failedQueue.push({resolve, reject});
                })
                    .then(() => {
                        logger.log('[Auth] Retrying request after refresh:', originalRequest.url);
                        return storeApi(originalRequest);
                    })
                    .catch((err) => {
                        logger.error('[Auth] Token refresh failed:', (err as AxiosError).message);
                        return Promise.reject(err);
                    });
            }

            isRefreshing = true;

            try {
                await refreshAccessToken();
                logger.log('[Auth] Token refreshed successfully.');
                processQueue(null);
                logger.log('[Auth] Retrying original request.');
                return storeApi(originalRequest);
            } catch (err) {
                logger.error('[Auth] Token refresh failed:', err);
                processQueue(err);
                if (logoutFromContext) {
                    logger.log('[Auth] Logging out user due to refresh failure.');
                    logoutFromContext();
                }
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default storeApi;
