import axios from 'axios';


const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem(import.meta.env.VITE_APP_AUTH_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
