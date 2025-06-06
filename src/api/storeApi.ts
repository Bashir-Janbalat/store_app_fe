import axios from 'axios';

const storeApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL_STORE,
    headers: {
        'Content-Type': 'application/json',
    },
});

storeApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

storeApi.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default storeApi;
