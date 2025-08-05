import axios from 'axios';
import authService from './auth';
import { logout } from '../reducers/auth';
import type { AppStore } from '../types/redux';

let isRefreshing = false;
let failedQueue: Array<() => void> = [];

const processQueue = () => {
  failedQueue.forEach((callback) => callback());
  failedQueue = [];
};

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the Authorization header with the token from localStorage
api.interceptors.request.use((config) => {
  const token = authService.getTokenFromLocalStorage();

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor to handle token refresh
export const setupTokenRefreshInterceptor = (store: AppStore) => {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url?.includes('/auth/refresh') &&
        !originalRequest.url?.includes('/auth/login')
      ) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise((resolve) => {
            failedQueue.push(() => {
              resolve(api(originalRequest));
            });
          });
        }

        isRefreshing = true;

        try {
          const response = await authService.refreshToken();
          const newToken = response.token;

          if (newToken) {
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            processQueue();
            return api(originalRequest);
          }

          throw new Error('Failed to refresh token');
        } catch (error) {
          processQueue();
          store.dispatch(logout());
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }
    }
  );
};

export default api;
