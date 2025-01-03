import axios from 'axios';

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
  },
});

baseApi.interceptors.request.use((request) => {
  const accessToken = JSON.parse(
    localStorage.getItem('currentUser') || 'null'
  )?.accessToken;
  request.headers.accessToken = accessToken;
  return request;
});
