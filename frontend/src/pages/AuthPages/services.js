import { getHeaders } from "../../utils";
import axios from "../../utils/axios";

export const registerUser = (registerData) => {
  var config = {
    method: 'post',
    url: '/api/auth/register/',
    data: registerData
  };
  return axios(config)
};

export const loginUser = (data) => {
  var config = {
    method: 'post',
    url: '/api/auth/login/',
    data: data
  };
  return axios(config)
};

export const updateProfile = (profileData) => {
  var config = {
    method: 'put',
    url: '/api/alumni-details/',
    data: profileData,
    headers: getHeaders()
  };
  return axios(config)
}