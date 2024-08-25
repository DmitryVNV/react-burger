import { PayloadAction } from "@reduxjs/toolkit";
import { TWsOrders } from "../types";
import {
  WS_CONNECTION_START_AUTH,
  WS_CONNECTION_CLOSE_AUTH,
  WS_CONNECTION_SUCCESS_AUTH,
  WS_CONNECTION_ERROR_AUTH,
  WS_CONNECTION_CLOSED_AUTH,
  WS_GET_MESSAGE_AUTH,
} from "../constants/ws-auth-actions";

export const wsAuthActions = {
  wsInit: WS_CONNECTION_START_AUTH,
  wsClose: WS_CONNECTION_CLOSE_AUTH,
  onOpen: WS_CONNECTION_SUCCESS_AUTH,
  onClose: WS_CONNECTION_CLOSED_AUTH,
  onError: WS_CONNECTION_ERROR_AUTH,
  onMessage: WS_GET_MESSAGE_AUTH,
} as const;

interface IWsActionWithPayload<T, P> {
  readonly type: T;
  payload: P;
}

interface IWsAction<T> {
  readonly type: T;
}

export type TWSAuthActions =
  | IWsAction<typeof WS_CONNECTION_START_AUTH>
  | IWsAction<typeof WS_CONNECTION_CLOSE_AUTH>
  | IWsActionWithPayload<typeof WS_CONNECTION_SUCCESS_AUTH, PayloadAction>
  | IWsActionWithPayload<typeof WS_CONNECTION_ERROR_AUTH, PayloadAction>
  | IWsActionWithPayload<typeof WS_CONNECTION_CLOSED_AUTH, PayloadAction>
  | IWsActionWithPayload<typeof WS_GET_MESSAGE_AUTH, TWsOrders>;