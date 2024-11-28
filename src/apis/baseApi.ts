import axios from 'axios';

const accessToken = JSON.parse(
  localStorage.getItem('currentUser') || 'null'
)?.accessToken;

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
    accessToken,
  },
});
