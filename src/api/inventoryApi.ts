import axios from 'axios';

const inventoryApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL_INVENTORY,
    headers: {
        'Content-Type': 'application/json',
    },
});

inventoryApi.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

inventoryApi.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default inventoryApi;
