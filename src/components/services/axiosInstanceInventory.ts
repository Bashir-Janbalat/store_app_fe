import axios from 'axios';

const axiosInstanceInventory = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL_INVENTORY,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstanceInventory.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstanceInventory.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstanceInventory;
