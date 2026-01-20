import axios from 'axios';


const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function getHeaders(additional) {
  const userToken = localStorage.getItem(import.meta.env.VITE_APP_AUTH_TOKEN_KEY);

  let headers = {
    ...additional,
  };

  if (userToken) {
    headers["Authorization"] = `Token ${userToken}`;
  }
  return headers;
}


export default api;
