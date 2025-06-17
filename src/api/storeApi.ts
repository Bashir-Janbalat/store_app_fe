import axios, {AxiosError, type InternalAxiosRequestConfig} from 'axios';
import Cookies from 'js-cookie';


interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
    _retryCount?: number;
}

const MAX_RETRY_COUNT = 3;

const storeApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL_STORE,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

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

let isRefreshing = false;
let failedQueue: {
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: unknown): void => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    failedQueue = [];
};

const refreshAccessToken = async (): Promise<void> => {
    console.log("Refreshing token...");
    await storeApi.post('/auth/refresh-token');
};

storeApi.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (error.response?.status === 401 && !originalRequest._retry &&  !originalRequest.url?.includes('/auth/login')) {
            originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

            if (originalRequest._retryCount > MAX_RETRY_COUNT) {
                console.warn("Max retry limit reached");
                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({resolve, reject});
                })
                    .then(() => storeApi(originalRequest))
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await refreshAccessToken();
                processQueue(null);
                return storeApi(originalRequest);
            } catch (err) {
                console.error("Token refresh failed:", err);
                processQueue(err);
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default storeApi;
