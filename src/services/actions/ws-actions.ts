import { PayloadAction } from "@reduxjs/toolkit";
import { TWsOrders } from "../types";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../constants/ws-actions";

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_CLOSE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
} as const;

interface IWsActionWithPayload<T, P> {
  readonly type: T;
  payload: P;
}

interface IWsAction<T> {
  readonly type: T;
}

export type TWSActions =
  | IWsAction<typeof WS_CONNECTION_START>
  | IWsAction<typeof WS_CONNECTION_CLOSE>
  | IWsActionWithPayload<typeof WS_CONNECTION_SUCCESS, PayloadAction>
  | IWsActionWithPayload<typeof WS_CONNECTION_ERROR, PayloadAction>
  | IWsActionWithPayload<typeof WS_CONNECTION_CLOSED, PayloadAction>
  | IWsActionWithPayload<typeof WS_GET_MESSAGE, TWsOrders>;