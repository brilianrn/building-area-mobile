import Axios, { AxiosRequestConfig } from 'axios';

import {
  removeLocalStorageItem,
  retrieveLocalStorageItem,
} from '../utils/localStorage';

const defaultOptions: AxiosRequestConfig = {
  baseURL: 'http://localhost:3001',
  timeout: 30000,
};

export const axiosInstance = Axios.create(defaultOptions);

axiosInstance.interceptors.request.use(async (req) => {
  const accessToken = (await retrieveLocalStorageItem('name')) || null;
  if (accessToken && req.headers) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      removeLocalStorageItem('name');
    }
    throw error;
  }
);
