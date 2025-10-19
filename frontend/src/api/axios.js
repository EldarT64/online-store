import axios from 'axios';
import config from './config.js';

const axiosInstance = axios.create({
    baseURL: config.API_BASE_URL, // базовый URL бэкенда
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    (request) => {
        const token = localStorage.getItem(config.TOKEN_KEY);
        if (token) request.headers.Authorization = `Bearer ${token}`;
        return request;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem(config.TOKEN_KEY);
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
