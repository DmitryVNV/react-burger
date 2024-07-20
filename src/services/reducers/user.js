import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_SET_EMAIL,
  SET_NEW_PASSWORD_REQUEST,
  SET_NEW_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILED,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
} from "../actions/user";

const initialState = {
  userData: {
    name: "",
    email: "",
  },

  resetPasswordEmail: "",
  resetPasswordRequest: false,
  resetPasswordFailed: false,
  resetPasswordMessage: null,

  setNewPasswordRequest: false,
  setNewPasswordFailed: false,
  setNewPasswordMessage: null,

  registerUserRequest: false,
  registerUserFailed: false,

  loginUserRequest: false,
  loginUserFailed: false,
  isAuthenthicated: false,

  logoutUserRequest: false,
  logoutUserFailed: false,
  logoutUserMessage: null,

  refreshTokenRequest: false,
  refreshTokenFailed: false,

  getUserRequest: false,
  getUserFailed: false,

  updateUserRequest: false,
  updateUserFailed: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: false,
        resetPasswordMessage: action.response,
        setNewPasswordMessage: null,
        resetPasswordEmail: "",
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: true,
        resetPasswordMessage: action.error,
      };
    }
    case RESET_PASSWORD_SET_EMAIL: {
      return {
        ...state,
        resetPasswordEmail: action.email,
      };
    }
    case SET_NEW_PASSWORD_REQUEST: {
      return {
        ...state,
        setNewPasswordRequest: true,
      };
    }
    case SET_NEW_PASSWORD_SUCCESS: {
      return {
        ...state,
        setNewPasswordRequest: false,
        setNewPasswordFailed: false,
        setNewPasswordMessage: action.response,
        resetPasswordMessage: null,
      };
    }
    case SET_NEW_PASSWORD_FAILED: {
      return {
        ...state,
        setNewPasswordRequest: false,
        setNewPasswordFailed: true,
        setNewPasswordMessage: action.error,
      };
    }
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        registerUserRequest: true,
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        registerUserRequest: false,
        registerUserFailed: false,
        isAuthenthicated: false,
      };
    }
    case REGISTER_USER_FAILED: {
      return {
        ...state,
        registerUserRequest: false,
        registerUserFailed: true,
      };
    }
    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        loginUserRequest: true,
        isAuthenthicated: false,
      };
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        userData: {
          ...state.userData,
          name: action.name,
          email: action.email,
        },
        loginUserRequest: false,
        loginUserFailed: false,
        isAuthenthicated: true,
      };
    }
    case LOGIN_USER_FAILED: {
      return {
        ...state,
        loginUserRequest: false,
        loginUserFailed: true,
      };
    }
    case LOGOUT_USER_REQUEST: {
      return {
        ...state,
        logoutUserRequest: true,
      };
    }
    case LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        userData: {
          ...state.userData,
          name: "",
          email: "",
        },
        isAuthenthicated: false,
        logoutUserRequest: false,
        logoutUserFailed: false,
        logoutUserMessage: action.message,
      };
    }
    case LOGOUT_USER_FAILED: {
      return {
        ...state,
        userData: {
          ...state.userData,
        },
        logoutUserRequest: false,
        logoutUserFailed: true,
      };
    }
    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        refreshTokenRequest: true,
      };
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        userData: {
          ...state.userData,
          name: action.user.name,
          email: action.user.email,
        },
        refreshTokenRequest: false,
        refreshTokenFailed: false,
        isAuthenthicated: true,
      };
    }
    case REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenFailed: true,
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserFailed: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        userData: {
          ...state.userData,
          name: action.user.name,
          email: action.user.email,
        },
        getUserFailed: false,
        getUserRequest: false,
        isAuthenthicated: true,
      };
    }
    case GET_USER_FAILED: {
      return { ...state, getUserFailed: true, getUserRequest: false };
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
        updateUserFailed: false,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        userData: {
          ...state.userData,
          name: action.user.name,
          email: action.user.email,
        },
        updateUserFailed: false,
        updateUserRequest: false,
        isAuthenthicated: true,
      };
    }
    case UPDATE_USER_FAILED: {
      return { ...state, updateUserFailed: true, updateUserRequest: false };
    }
    default: {
      return state;
    }
  }
};