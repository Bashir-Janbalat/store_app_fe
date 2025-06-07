import axios from 'axios';

const storeApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL_STORE,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

storeApi.interceptors.request.use(
    (config) => {
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
