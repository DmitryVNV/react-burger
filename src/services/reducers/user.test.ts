import { userReducer, initialState } from "./user";
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
} from "../constants/user";
import { TUserActions } from "../actions/user";

describe("user reducer", () => {
  it("Return the initial state", () => {
    expect(userReducer(undefined, {} as TUserActions)).toEqual(initialState);
  });
  it("Check if handle RESET_PASSWORD_REQUEST", () => {
    const state = {
      ...initialState,
      resetPasswordRequest: true,
    };
    expect(
      userReducer(undefined, {
        type: RESET_PASSWORD_REQUEST,
      })
    ).toEqual(state);
  });
  it("Check if handle RESET_PASSWORD_FAILED", () => {
    const state = {
      ...initialState,
      resetPasswordRequest: false,
      resetPasswordFailed: true,
      resetPasswordMessage: "",
    };
    expect(
      userReducer(undefined, {
        type: RESET_PASSWORD_FAILED,
        error: "",
      })
    ).toEqual(state);
  });
  it("Check if handle RESET_PASSWORD_SET_EMAIL", () => {
    const state = {
      ...initialState,
      resetPasswordEmail: "",
    };
    expect(
      userReducer(undefined, {
        type: RESET_PASSWORD_SET_EMAIL,
        email: "",
      })
    ).toEqual(state);
  });
  it("Check if handle RESET_PASSWORD_SET_EMAIL", () => {
    const state = {
      ...initialState,
      resetPasswordEmail: "",
    };
    expect(
      userReducer(undefined, {
        type: RESET_PASSWORD_SET_EMAIL,
        email: "",
      })
    ).toEqual(state);
  });
  it("Check if handle SET_NEW_PASSWORD_REQUEST", () => {
    const state = {
      ...initialState,
      setNewPasswordRequest: true,
    };
    expect(
      userReducer(undefined, {
        type: SET_NEW_PASSWORD_REQUEST,
      })
    ).toEqual(state);
  });
  it("Check if handle SET_NEW_PASSWORD_SUCCESS", () => {
    const state = {
      ...initialState,
      setNewPasswordRequest: false,
      setNewPasswordFailed: false,
      setNewPasswordMessage: "",
      resetPasswordMessage: "",
    };
    expect(
      userReducer(undefined, {
        type: SET_NEW_PASSWORD_SUCCESS,
        response: "",
      })
    ).toEqual(state);
  });
  it("Check if handle SET_NEW_PASSWORD_FAILED", () => {
    const state = {
      ...initialState,
      setNewPasswordRequest: false,
      setNewPasswordFailed: true,
      setNewPasswordMessage: "",
    };
    expect(
      userReducer(undefined, {
        type: SET_NEW_PASSWORD_FAILED,
        error: "",
      })
    ).toEqual(state);
  });
  it("Check if handle REGISTER_USER_REQUEST", () => {
    const state = {
      ...initialState,
      registerUserRequest: true,
    };
    expect(
      userReducer(undefined, {
        type: REGISTER_USER_REQUEST,
      })
    ).toEqual(state);
  });
  it("Check if handle REGISTER_USER_SUCCESS", () => {
    const state = {
      ...initialState,
      registerUserRequest: false,
      registerUserFailed: false,
      isAuthenthicated: false,
    };
    expect(
      userReducer(undefined, {
        type: REGISTER_USER_SUCCESS,
      })
    ).toEqual(state);
  });
  it("Check if handle REGISTER_USER_FAILED", () => {
    const state = {
      ...initialState,
      registerUserRequest: false,
      registerUserFailed: true,
    };
    expect(
      userReducer(undefined, {
        type: REGISTER_USER_FAILED,
      })
    ).toEqual(state);
  });
  it("Check if handle LOGIN_USER_REQUEST", () => {
    const state = {
      ...initialState,
      loginUserRequest: true,
    };
    expect(
      userReducer(undefined, {
        type: LOGIN_USER_REQUEST,
      })
    ).toEqual(state);
  });
  it("Check if handle LOGIN_USER_SUCCESS", () => {
    const state = {
      ...initialState,
      loginUserRequest: false,
      loginUserFailed: false,
      isAuthenthicated: true,
    };
    expect(
      userReducer(undefined, {
        type: LOGIN_USER_SUCCESS,
        name: "",
        email: "",
      })
    ).toEqual(state);
  });
  it("Check if handle LOGIN_USER_FAILED", () => {
    const state = {
      ...initialState,
      loginUserRequest: false,
      loginUserFailed: true,
    };
    expect(
      userReducer(undefined, {
        type: LOGIN_USER_FAILED,
      })
    ).toEqual(state);
  });
  it("Check if handle LOGOUT_USER_REQUEST", () => {
    const state = {
      ...initialState,
      logoutUserRequest: true,
    };
    expect(
      userReducer(undefined, {
        type: LOGOUT_USER_REQUEST,
      })
    ).toEqual(state);
  });
  it("Check if handle LOGOUT_USER_SUCCESS", () => {
    const state = {
      ...initialState,
      isAuthenthicated: false,
      logoutUserRequest: false,
      logoutUserFailed: false,
      logoutUserMessage: "",
    };
    expect(
      userReducer(undefined, {
        type: LOGOUT_USER_SUCCESS,
        message: "",
      })
    ).toEqual(state);
  });
  it("Check if handle LOGOUT_USER_FAILED", () => {
    const state = {
      ...initialState,
      logoutUserRequest: false,
      logoutUserFailed: true,
    };
    expect(
      userReducer(undefined, {
        type: LOGOUT_USER_FAILED,
      })
    ).toEqual(state);
  });
  it("Check if handle REFRESH_TOKEN_REQUEST", () => {
    const state = {
      ...initialState,
      refreshTokenRequest: true,
    };
    expect(
      userReducer(undefined, {
        type: REFRESH_TOKEN_REQUEST,
      })
    ).toEqual(state);
  });
  it("Check if handle REFRESH_TOKEN_SUCCESS", () => {
    const state = {
      ...initialState,
      refreshTokenRequest: false,
      refreshTokenFailed: false,
      isAuthenthicated: true,
    };
    expect(
      userReducer(undefined, {
        type: REFRESH_TOKEN_SUCCESS,
        user: { name: "", email: "", password: "" },
      })
    ).toEqual(state);
  });
  it("Check if handle REFRESH_TOKEN_FAILED", () => {
    const state = {
      ...initialState,
      refreshTokenRequest: false,
      refreshTokenFailed: true,
    };
    expect(
      userReducer(undefined, {
        type: REFRESH_TOKEN_FAILED,
      })
    ).toEqual(state);
  });
  it("Check if handle GET_USER_REQUEST", () => {
    const state = {
      ...initialState,
      getUserRequest: true,
      getUserFailed: false,
    };
    expect(
      userReducer(undefined, {
        type: GET_USER_REQUEST,
      })
    ).toEqual(state);
  });
  it("Check if handle GET_USER_SUCCESS", () => {
    const state = {
      ...initialState,
      getUserFailed: false,
      getUserRequest: false,
      isAuthenthicated: true,
    };
    expect(
      userReducer(undefined, {
        type: GET_USER_SUCCESS,
        user: { name: "", email: "", password: "" },
      })
    ).toEqual(state);
  });
  it("Check if handle GET_USER_FAILED", () => {
    const state = {
      ...initialState,
      getUserFailed: true,
      getUserRequest: false,
    };
    expect(
      userReducer(undefined, {
        type: GET_USER_FAILED,
      })
    ).toEqual(state);
  });
  it("Check if handle UPDATE_USER_REQUEST", () => {
    const state = {
      ...initialState,
      updateUserRequest: true,
      updateUserFailed: false,
    };
    expect(
      userReducer(undefined, {
        type: UPDATE_USER_REQUEST,
      })
    ).toEqual(state);
  });
  it("Check if handle UPDATE_USER_SUCCESS", () => {
    const state = {
      ...initialState,
      updateUserFailed: false,
      updateUserRequest: false,
      isAuthenthicated: true,
    };
    expect(
      userReducer(undefined, {
        type: UPDATE_USER_SUCCESS,
        user: { name: "", email: "", password: "" },
      })
    ).toEqual(state);
  });
  it("Check if handle UPDATE_USER_FAILED", () => {
    const state = {
      ...initialState,
      updateUserFailed: true,
      updateUserRequest: false,
    };
    expect(
      userReducer(undefined, {
        type: UPDATE_USER_FAILED,
      })
    ).toEqual(state);
  });
});
