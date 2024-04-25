'use server'

import axios from 'axios'
import { cookies } from 'next/headers'

export const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
})

axiosClient.interceptors.request.use(
    (config) => {
        if (config.headers) {
            const token = cookies().get("access_token")?.value;
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = cookies().get("refresh_token")?.value;
                const response = await axios.post('/api/auth/refresh', { refreshToken });
                const { token } = response.data;

                cookies().set("access_token", token, { path: "/" })

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