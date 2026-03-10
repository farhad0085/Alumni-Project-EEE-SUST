import axios from 'axios';
import { AUTH_TOKEN_KEY } from './constants';


const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE,
});

export function getHeaders(additional) {
  const userToken = localStorage.getItem(AUTH_TOKEN_KEY);

  let headers = {
    ...additional,
  };

  if (userToken) {
    headers["Authorization"] = `Token ${userToken}`;
  }
  return headers;
}


export default api;
