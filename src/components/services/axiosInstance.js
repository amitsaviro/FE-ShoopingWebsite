import axios from 'axios';

let url = 'http://localhost:8080';

const axiosConfig = {
    baseURL: url,
};

export const axiosInstance = axios.create(axiosConfig);

// Interceptor to add JWT token to headers
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');  // Fetch token from localStorage or your preferred storage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
