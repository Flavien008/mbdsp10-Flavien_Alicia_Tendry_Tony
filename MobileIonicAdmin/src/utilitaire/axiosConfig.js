// src/utilitaire/axiosConfig.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://modular-analog-431619-t6.oa.r.appspot.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle error
    return Promise.reject(error);
  }
);

export default axiosInstance;
