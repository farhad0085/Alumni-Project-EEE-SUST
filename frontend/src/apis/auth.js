import axios, { getHeaders } from 'utils/axios';

export const registerUser = (userData) => axios.post(`/api/auth/register/`, userData);
export const loginUser = (credentials) => axios.post(`/api/auth/login/`, credentials);
export const logoutUser = () => axios.post(`/api/auth/logout/`, null, { headers: getHeaders() });
export const userInfo = () => axios.get("/api/auth/user/me/", { headers: getHeaders() });
export const requestForgetPassword = (email) => axios.post("/api/auth/password/reset/", { email });
export const confirmForgetPassword = (data) => axios.post('/api/auth/password/reset/confirm/', data)
export const updateProfileInfo = (data) => axios.post("/api/auth/user/me/", data, { headers: getHeaders() });
export const changePassword = (data) => axios.post("/api/auth/password/change/", data, { headers: getHeaders() })
