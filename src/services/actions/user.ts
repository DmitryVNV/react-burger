import {
  passwordReset,
  setNewPassword,
  registerUser,
  loginUser,
  logoutUser,
  updateToken,
  getUser,
  updateUser,
  expiresAccess,
  expiresRefresh,
  setCookie,
  getCookie,
  deleteCookie,
} from "../../utils/api";

import { TUser, TAppDispatch } from "../types";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";
export const RESET_PASSWORD_SET_EMAIL = "RESET_PASSWORD_SET_EMAIL";

export const SET_NEW_PASSWORD_REQUEST = "SET_NEW_PASSWORD_REQUEST";
export const SET_NEW_PASSWORD_SUCCESS = "SET_NEW_PASSWORD_SUCCESS";
export const SET_NEW_PASSWORD_FAILED = "SET_NEW_PASSWORD_FAILED";

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILED = "REGISTER_USER_FAILED";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";

export const LOGOUT_USER_REQUEST = "LOGOUT_USER_REQUEST";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_FAILED = "LOGOUT_USER_FAILED";

export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAILED = "REFRESH_TOKEN_FAILED";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";

export const SET_FORGOT_PASSWORD_VISITED = "SET_FORGOT_PASSWORD_VISITED";

export interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  readonly response: string;
}
export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
  readonly error: string;
}
export interface IResetPasswordSetEmailAction {
  readonly type: typeof RESET_PASSWORD_SET_EMAIL;
  readonly email: string;
}
export interface ISetForgotPasswordVisitedAction {
  readonly type: typeof SET_FORGOT_PASSWORD_VISITED;
}

export interface ISetNewPasswordRequestAction {
  readonly type: typeof SET_NEW_PASSWORD_REQUEST;
}
export interface ISetNewPasswordSuccessAction {
  readonly type: typeof SET_NEW_PASSWORD_SUCCESS;
  readonly response: string;
}
export interface ISetNewPasswordFailedAction {
  readonly type: typeof SET_NEW_PASSWORD_FAILED;
  readonly error: string;
}

export interface IRefreshTokenRequestAction {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
}
export interface IRefreshTokenSuccessAction {
  readonly type: typeof REFRESH_TOKEN_SUCCESS;
  readonly user: TUser;
}
export interface IRefreshTokenFailedAction {
  readonly type: typeof REFRESH_TOKEN_FAILED;
}

export interface IRegisterUserRequestAction {
  readonly type: typeof REGISTER_USER_REQUEST;
}
export interface IRegisterUserSuccessAction {
  readonly type: typeof REGISTER_USER_SUCCESS;
}
export interface IRegisterUserFailedAction {
  readonly type: typeof REGISTER_USER_FAILED;
}

export interface ILoginUserRequestAction {
  readonly type: typeof LOGIN_USER_REQUEST;
}
export interface ILoginUserSuccessAction {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly name: string;
  readonly email: string;
}
export interface ILoginUserFailedAction {
  readonly type: typeof LOGIN_USER_FAILED;
}

export interface ILogoutUserRequestAction {
  readonly type: typeof LOGOUT_USER_REQUEST;
}
export interface ILogoutUserSuccessAction {
  readonly type: typeof LOGOUT_USER_SUCCESS;
  readonly message: string;
}
export interface ILogoutUserFailedAction {
  readonly type: typeof LOGOUT_USER_FAILED;
}

export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST;
}
export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: TUser;
}
export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}

export interface IUpdateUserRequestAction {
  readonly type: typeof UPDATE_USER_REQUEST;
}
export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly user: TUser;
}
export interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED;
}

export type TUserActions =
  | IResetPasswordRequestAction
  | IResetPasswordSuccessAction
  | IResetPasswordFailedAction
  | IResetPasswordSetEmailAction
  | ISetNewPasswordRequestAction
  | ISetNewPasswordSuccessAction
  | ISetNewPasswordFailedAction
  | ISetForgotPasswordVisitedAction
  | IRefreshTokenRequestAction
  | IRefreshTokenSuccessAction
  | IRefreshTokenFailedAction
  | IRegisterUserRequestAction
  | IRegisterUserSuccessAction
  | IRegisterUserFailedAction
  | ILoginUserRequestAction
  | ILoginUserSuccessAction
  | ILoginUserFailedAction
  | ILogoutUserRequestAction
  | ILogoutUserSuccessAction
  | ILogoutUserFailedAction
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | IUpdateUserRequestAction
  | IUpdateUserSuccessAction
  | IUpdateUserFailedAction;

export const resetPasswordEnhancer = (email: string) => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    passwordReset(email)
      .then((res) => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          response: res,
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: RESET_PASSWORD_FAILED,
          error: err.message,
        });
      });
  };
};

export const setNewPasswordEnhancer = (newPassword: string, token: string) => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: SET_NEW_PASSWORD_REQUEST,
    });
    setNewPassword(newPassword, token)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SET_NEW_PASSWORD_SUCCESS,
            response: res,
          });
        } else {
          dispatch({
            type: SET_NEW_PASSWORD_FAILED,
            error: "Ошибка при смене пароля",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: SET_NEW_PASSWORD_FAILED,
          error: err.message,
        });
      });
  };
};

export const registerUserEnhancer = (email: string, password: string, name: string) => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    registerUser(email, password, name)
      .then((res) => {
        if (res && res.success) {
          setCookie("refreshToken", res.refreshToken, expiresRefresh);
          setCookie("accessToken", res.accessToken, expiresAccess);

          dispatch({
            type: REGISTER_USER_SUCCESS,
          });
        } else {
          dispatch({
            type: REGISTER_USER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: REGISTER_USER_FAILED,
          error: err.message,
        });
      });
  };
};

export const loginUserEnhancer = (email: string, password: string) => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });
    loginUser(email, password)
      .then((res) => {
        if (res && res.success) {
          setCookie("refreshToken", res.refreshToken, expiresRefresh);
          setCookie("accessToken", res.accessToken, expiresAccess);

          dispatch({
            type: LOGIN_USER_SUCCESS,
            name: res.user.name,
            email: res.user.email,
          });
        } else {
          dispatch({
            type: LOGIN_USER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: LOGIN_USER_FAILED,
          error: err.message,
        });
      });
  };
};

export const logoutUserEnhancer = () => {
  return function (dispatch: TAppDispatch) {
    const tokenBody = { token: getCookie("refreshToken") };
    dispatch({
      type: LOGOUT_USER_REQUEST,
    });
    logoutUser(tokenBody)
      .then((res) => {
        if (res && res.success) {
          deleteCookie("accessToken");
          deleteCookie("refreshToken");

          dispatch({
            type: LOGOUT_USER_SUCCESS,
            message: res.message,
          });
        } else {
          dispatch({
            type: LOGOUT_USER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: LOGOUT_USER_FAILED,
          error: err.message,
        });
      });
  };
};

export const updateTokenEnhancer = () => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: REFRESH_TOKEN_REQUEST,
    });
    updateToken()
      .then((res) => {
        if (res && res.success) {
          setCookie("refreshToken", res.refreshToken, expiresRefresh);
          setCookie("accessToken", res.accessToken, expiresAccess);
          dispatch({
            type: REFRESH_TOKEN_SUCCESS,
            user: res.user,
          });
        } else {
          dispatch({
            type: REFRESH_TOKEN_FAILED,
          });
        }
      })
      .catch((err) => {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        dispatch({
          type: REFRESH_TOKEN_FAILED,
        });
      });
  };
};

export const getUserEnhancer = () => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    getUser()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            user: res.user,
          });
        } else {
          throw res;
        }
      })
      .catch((res) => {
        dispatch({
          type: GET_USER_FAILED,
        });
      });
  };
};

export const updateUserEnhancer = (name: string, email: string, password: string) => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    const data = {
      name: name,
      email: email,
      password: password,
    };
    updateUser(data)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: UPDATE_USER_SUCCESS,
            user: res.user,
          });
        } else {
          throw res;
        }
      })
      .catch((res) => {
        dispatch({
          type: UPDATE_USER_FAILED,
        });
      });
  };
};

export const checkUserAuth = () => {
  return function (dispatch: TAppDispatch) {
    const isAccessTokenExist = document.cookie.indexOf("accessToken=") !== -1;
    const isRefreshTokenExist = document.cookie.indexOf("refreshToken=") !== -1;
    if (!isAccessTokenExist && isRefreshTokenExist) {
      dispatch({
        type: REFRESH_TOKEN_REQUEST,
      });
      updateToken()
        .then((res) => {
          if (res && res.success) {
            setCookie("refreshToken", res.refreshToken, expiresRefresh);
            setCookie("accessToken", res.accessToken, expiresAccess);
            dispatch({
              type: REFRESH_TOKEN_SUCCESS,
              user: res.user,
            });
          } else {
            dispatch({
              type: REFRESH_TOKEN_FAILED,
            });
          }
        })
        .catch((err) => {
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          dispatch({
            type: REFRESH_TOKEN_FAILED,
          });
        });
    }
    if (isAccessTokenExist && isRefreshTokenExist) {
      dispatch({
        type: GET_USER_REQUEST,
      });
      getUser()
        .then((res) => {
          if (res && res.success) {
            dispatch({
              type: GET_USER_SUCCESS,
              user: res.user,
            });
          } else {
            throw res;
          }
        })
        .catch((res) => {
          dispatch({
            type: GET_USER_FAILED,
          });
        });
    }
  };
};

export const setForgotPasswordVisited = (): ISetForgotPasswordVisitedAction => ({
  type: SET_FORGOT_PASSWORD_VISITED,
});