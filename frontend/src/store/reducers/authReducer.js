import * as Types from "../actions/actionTypes";

const initialState = {
  isAuthenticated: !!localStorage.getItem("alumniUserToken"),
  loginErrors: {},
  registerErrors: {},
  logoutErrors: {},
  resetPasswordErrors: {},
  loading: false,
  passwordResetEmailSent: false,
  passwordResetted: false,
  user: {},
  isResetEmailSent: false,
  isForgotPOpened: false,
  isForgotPasswordFailed: false,
  changePassword: {
    errors: {},
    success: false,
  },
  updateProfile: {
    errors: {},
    success: false,
  },
  usernameGuessed: {
    loading: false,
    username: "",
  },
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case Types.USER_LOGGED_IN: {
      return {
        ...state,
        isAuthenticated: true,
        loginErrors: {},
        user: action.payload ? action.payload : { ...state.user },
      };
    }
    case Types.USER_LOGIN_ERROR: {
      return {
        ...state,
        loginErrors: action.payload,
      };
    }
    case Types.USER_REGISTERED: {
      return {
        ...state,
        isAuthenticated: true,
        registerErrors: {},
      };
    }
    case Types.USER_REGISTER_ERROR: {
      return {
        ...state,
        registerErrors: action.payload,
      };
    }
    case Types.AUTH_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case Types.USER_LOGGED_OUT: {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    case Types.USER_LOGOUT_ERROR: {
      return {
        ...state,
        logoutErrors: action.payload,
      };
    }
    case Types.USER_FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        isResetEmailSent: action.payload,
      };
    }
    case Types.TOGGLE_FORGOT_PASSWORD: {
      return {
        ...state,
        isForgotPOpened: action.payload,
      };
    }
    case Types.FORGOT_PASSWORD_FAIL: {
      return {
        ...state,
        isForgotPasswordFailed: action.payload,
      };
    }
    case Types.RESET_PASSWORD_ERROR: {
      return {
        ...state,
        resetPasswordErrors: action.payload,
        passwordResetted: false,
      };
    }
    case Types.RESET_PASSWORD_STATUS: {
      return {
        ...state,
        passwordResetted: action.payload,
        resetPasswordErrors: {},
      };
    }
    case Types.CHANGE_PASSWORD_ERRORS: {
      return {
        ...state,
        changePassword: {
          success: false,
          errors: action.payload,
        },
      };
    }
    case Types.PASSWORD_CHANGED: {
      return {
        ...state,
        changePassword: {
          success: true,
          errors: {},
        },
      };
    }
    case Types.PROFILE_UPDATE_ERRORS: {
      return {
        ...state,
        updateProfile: {
          success: false,
          errors: action.payload,
        },
      };
    }
    case Types.PROFILE_UPDATED: {
      return {
        ...state,
        user: action.payload,
        updateProfile: {
          success: true,
          errors: {},
        },
      };
    }
    case Types.GENERATE_USERNAME_LOADING: {
      return {
        ...state,
        usernameGuessed: {
          ...state.usernameGuessed,
          loading: action.payload,
        },
      };
    }
    case Types.GENERATE_USERNAME_LOADED: {
      return {
        ...state,
        usernameGuessed: {
          ...state.usernameGuessed,
          username: action.payload,
        },
      };
    }
    default:
      return state;
  }
}

export default authReducer;
