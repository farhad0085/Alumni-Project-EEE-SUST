import axios from "../../utils/axios";

export const registerUser = (registerData) => {
  var config = {
    method: 'post',
    url: '/api/auth/register/',
    // headers: { 
    //   // ...registerData.getHeaders()
    // },
    data: registerData
  };
  return axios(config)
};
