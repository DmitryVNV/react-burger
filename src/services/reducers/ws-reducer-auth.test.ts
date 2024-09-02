import { wsReducerAuth, initialState } from "./ws-reducer-auth";
import { WS_CONNECTION_SUCCESS_AUTH, WS_CONNECTION_ERROR_AUTH, WS_CONNECTION_CLOSED_AUTH, WS_GET_MESSAGE_AUTH } from "../constants/ws-auth-actions";
import { PayloadAction } from "@reduxjs/toolkit";
import { TWsOrders } from "../types";
import { TWSAuthActions } from "../actions/ws-auth-actions";

describe("wsReducerAuth", () => {
  it("Return the initial state", () => {
    expect(wsReducerAuth(undefined, {} as TWSAuthActions)).toEqual(initialState);
  });
  it("Check if handle WS_CONNECTION_SUCCESS_AUTH", () => {
    const state = {
      ...initialState,
      wsConnected: true,
    };
    expect(
      wsReducerAuth(undefined, {
        type: WS_CONNECTION_SUCCESS_AUTH,
        payload: {} as PayloadAction,
      })
    ).toEqual(state);
  });
  it("Check if handle WS_CONNECTION_ERROR_AUTH", () => {
    const state = {
      ...initialState,
      error: {} as PayloadAction,
      wsConnected: false,
    };
    expect(
      wsReducerAuth(undefined, {
        type: WS_CONNECTION_ERROR_AUTH,
        payload: {} as PayloadAction,
      })
    ).toEqual(state);
  });
  it("Check if handle WS_CONNECTION_CLOSED_AUTH", () => {
    const state = {
      ...initialState,
      wsConnected: false,
    };
    expect(
      wsReducerAuth(undefined, {
        type: WS_CONNECTION_CLOSED_AUTH,
        payload: {} as PayloadAction,
      })
    ).toEqual(state);
  });
  it("Check if handle WS_GET_MESSAGE_AUTH", () => {
    const state = {
      ...initialState,
      orders: undefined,
      total: undefined,
      totalToday: undefined,
    };
    expect(
      wsReducerAuth(undefined, {
        type: WS_GET_MESSAGE_AUTH,
        payload: {} as TWsOrders,
      })
    ).toEqual(state);
  });
});
