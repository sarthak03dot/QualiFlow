import axios from 'axios';
import { store } from '../store';
import { updateAccessToken, logout } from '../store/slices/authSlice';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = store.getState().auth.refreshToken;
                if (!refreshToken) {
                    store.dispatch(logout());
                    return Promise.reject(error);
                }

                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`, {
                    refreshToken,
                });

                const { accessToken } = response.data;
                store.dispatch(updateAccessToken(accessToken));

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                store.dispatch(logout());
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
