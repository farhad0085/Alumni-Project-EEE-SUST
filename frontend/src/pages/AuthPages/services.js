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
