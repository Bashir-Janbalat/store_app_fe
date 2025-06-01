import axios from 'axios';

const axiosInstanceStore = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL_STORE,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstanceStore.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstanceStore.interceptors.response.use(
    (response) => response,
    (error) => {
        const isLoginPage = window.location.pathname === '/login';
        if (error.response?.status === 401 && !isLoginPage) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstanceStore;
