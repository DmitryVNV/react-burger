import {
  WS_CONNECTION_SUCCESS_AUTH,
  WS_CONNECTION_ERROR_AUTH,
  WS_CONNECTION_CLOSED_AUTH,
  WS_GET_MESSAGE_AUTH,
} from "../constants/ws-auth-actions";
import { TWSAuthActions } from "../actions/ws-auth-actions";
import { TWsOrder } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";

type TWsReduserAuthState = {
  wsConnected: Boolean;
  error: PayloadAction | null;
  orders: Array<TWsOrder>;
  total: number | null;
  totalToday: number | null;
};

export const initialState: TWsReduserAuthState = {
  wsConnected: false,
  error: null,
  orders: [],
  total: null,
  totalToday: null,
};

export const wsReducerAuth = (state = initialState, action: TWSAuthActions): TWsReduserAuthState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS_AUTH:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR_AUTH:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED_AUTH:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_MESSAGE_AUTH:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    default:
      return state;
  }
};