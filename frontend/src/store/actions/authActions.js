import { getHeaders } from "../../utils";
import axios from "../../utils/axios";
import * as Types from "./actionTypes";


export const login = (loginCreds, history) => (dispatch) => {
  dispatch({ type: Types.USER_LOGIN_LOADING, payload: true });
  dispatch({ type: Types.USER_LOGIN_ERROR, payload: {} });
  
  axios
    .post("/auth/login/", loginCreds)
    .then((res) => {
      localStorage.setItem(process.env.REACT_APP_TOKEN_KEY, res.data.key);
      dispatch({ type: Types.USER_LOGGED_IN });
      history.push("/");
      dispatch(loadUserInfo());
    })
    .catch((error) => {
      dispatch({
        type: Types.USER_LOGIN_ERROR, 
        payload: error.response ? error.response.data : {},
      });
      dispatch({ type: Types.AUTH_LOADING, payload: false });
    });
};

export const register = (registerData, history) => (dispatch) => {
  dispatch({ type: Types.AUTH_LOADING, payload: true });
  dispatch({ type: Types.USER_REGISTER_ERROR, payload: {} });

  axios
    .post("/auth/register/", registerData)
    .then((res) => {
      localStorage.setItem(process.env.REACT_APP_TOKEN_KEY, res.data.key);
      dispatch({ type: Types.AUTH_LOADING, payload: false });
      dispatch({ type: Types.USER_REGISTERED });
      history.push("/");
      dispatch(loadUserInfo()); // after registration complete get user info
      dispatch({ type: Types.REGISTER_POPUP_TOGGLER, payload: true });
    })
    .catch((error) => {
      // console.log(error.response);
      dispatch({
        type: Types.USER_REGISTER_ERROR,
        payload: error.response ? error.response.data : {},
      });
      dispatch({ type: Types.AUTH_LOADING, payload: false });
    });
};

export const logout = (history) => (dispatch) => {
  dispatch({ type: Types.AUTH_LOADING, payload: true });

  axios
    .post("/auth/logout/", {}, { headers: getHeaders() })
    .then((res) => {
      localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY);
      dispatch({ type: Types.USER_LOGGED_OUT });
      dispatch({ type: Types.AUTH_LOADING, payload: false });
      // history.push("/");
    })
    .catch((error) => {
    //   console.log(error.response);
      dispatch({
        type: Types.USER_LOGOUT_ERROR,
        payload: error.response ? error.response.data : {},
      });
      dispatch({ type: Types.AUTH_LOADING, payload: false });
    });
};

export const loadUserInfo = () => (dispatch) => {
  dispatch({ type: Types.AUTH_LOADING, payload: true });

  axios
    .get("/auth/user/me/", { headers: getHeaders() })
    .then((res) => {
      dispatch({ type: Types.USER_LOGGED_IN, payload: res.data });
      dispatch({ type: Types.AUTH_LOADING, payload: false });
    })
    .catch((error) => {
    //   console.log(error.response);
      localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY);
      dispatch({ type: Types.USER_LOGGED_OUT });
      dispatch({ type: Types.AUTH_LOADING, payload: false });
    });
};

export const forgotPassword = (email, done) => (dispatch) => {
  dispatch({ type: Types.AUTH_LOADING, payload: true });
  dispatch({ type: Types.FORGOT_PASSWORD_FAIL, payload: false });
  axios
    .post("auth/password/reset/", {
      email,
    })
    .then((res) => {
      dispatch({ type: Types.AUTH_LOADING, payload: false });
      dispatch({ type: Types.USER_FORGOT_PASSWORD_SUCCESS, payload: true });
      setTimeout(() => {
        dispatch({ type: Types.TOGGLE_FORGOT_PASSWORD, payload: false });
        dispatch({ type: Types.USER_FORGOT_PASSWORD_SUCCESS, payload: false });
      }, 5000);
      done("email is sent")
    })
    .catch((error) => {
      dispatch({ type: Types.FORGOT_PASSWORD_FAIL, payload: true });
      dispatch({ type: Types.AUTH_LOADING, payload: false });
    });
};

export const resetPassword = (token, uid, new_password1, new_password2) => dispatch => {
    dispatch({type: Types.AUTH_LOADING, payload: true})
    dispatch({type: Types.RESET_PASSWORD_ERROR, payload: {}})

    axios.post("/auth/password/reset/confirm/", {new_password1, new_password2, uid, token})
    .then(res => {
        dispatch({type: Types.AUTH_LOADING, payload: false})
        dispatch({type: Types.RESET_PASSWORD_STATUS, payload: true})
    })
    .catch(error => {
        dispatch({type: Types.AUTH_LOADING, payload: false})
        dispatch({type: Types.RESET_PASSWORD_ERROR, payload: error.response.data})
    })
}

export const changePassword = (passwordData) => dispatch => {
  dispatch({type: Types.AUTH_LOADING, payload: true})
  dispatch({type: Types.CHANGE_PASSWORD_ERRORS, payload: {}})
  
  axios.post("/auth/password/change/", passwordData, {headers: getHeaders()})
  .then(res => {
    dispatch({type: Types.AUTH_LOADING, payload: false})
    dispatch({type: Types.PASSWORD_CHANGED})
  })
  .catch(error => {
    dispatch({type: Types.AUTH_LOADING, payload: false})
    dispatch({type: Types.CHANGE_PASSWORD_ERRORS, payload: error.response.data})
  })
}

export const updateProfile = (profileData) => dispatch => {
  dispatch({type: Types.AUTH_LOADING, payload: true})
  dispatch({type: Types.PROFILE_UPDATE_ERRORS, payload: {}})
  
  axios.post("/auth/user/me/", profileData, {headers: getHeaders()})
  .then(res => {
    dispatch({type: Types.AUTH_LOADING, payload: false})
    dispatch({type: Types.PROFILE_UPDATED, payload: res.data.data})
  })
  .catch(error => {
    dispatch({type: Types.AUTH_LOADING, payload: false})
    dispatch({type: Types.PROFILE_UPDATE_ERRORS, payload: error.response.data})
  })
}

export const generateUsername = (emailData) => dispatch => {
  dispatch({type: Types.GENERATE_USERNAME_LOADING, payload: true})
  
  axios.post("/auth/generate-username/", emailData, {headers: getHeaders()})
  .then(res => {
    dispatch({type: Types.GENERATE_USERNAME_LOADED, payload: res.data?.username})
    dispatch({type: Types.GENERATE_USERNAME_LOADING, payload: false})
  })
  .catch(error => {
    dispatch({type: Types.GENERATE_USERNAME_LOADING, payload: false})
  })
}