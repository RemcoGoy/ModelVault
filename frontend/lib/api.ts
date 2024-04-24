'use server'

import axios from 'axios'
import { cookies } from 'next/headers'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
})

api.interceptors.request.use(
    (config) => {
        if (config.headers) {
            const token = cookies().get("access_token")?.value;
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post('/api/auth/refresh', { refreshToken });
                const { token } = response.data;

                localStorage.setItem('token', token);

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axios(originalRequest);
            } catch (error) {
                // Handle refresh token error or redirect to login
            }
        }

        return Promise.reject(error);
    }
);

export default api