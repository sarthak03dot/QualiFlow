import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

api.interceptors.response.use(
    res => res,
    async err => {
        if (err.response?.status === 401) {
            await api.post("/auth/refresh");
            return api(err.config);
        }
        return Promise.reject(err);
    }
);
