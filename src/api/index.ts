import axios from 'axios';

import { getRefreshToken } from '@/src/api/auth';

export const commonAxiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
  },
});

export const authAxiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
  },
});

authAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 401) {
      if (error.response.statusText === 'Unauthorized') {
        const originRequest = config;
        const response = await getRefreshToken();
        if (response.status === 200) {
          const newAccessToken = response.data.token;
          localStorage.setItem('accessToken', newAccessToken);
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originRequest);
        } else if (response.status === 401) {
          localStorage.removeItem('accessToken');
          window.location.href = '/login';
        }
        console.log(response);
      }
    }
    return Promise.reject(error);
  },
);
