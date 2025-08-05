import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import { setupTokenRefreshInterceptor } from './services/api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

setupTokenRefreshInterceptor(store);