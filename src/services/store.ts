import { applyMiddleware, createStore, compose } from "redux";
import { thunk } from "redux-thunk";
import { rootReducer } from "./reducers";
import { socketMiddleware } from "./middleware";
import { wsActions } from "./actions/ws-actions";
import { wsAuthActions } from "./actions/ws-auth-actions";
import { WS_URL, WS_AUTH_URL } from "../utils/api";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const enhancerComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = enhancerComposer(
  applyMiddleware(
    thunk,
    socketMiddleware(WS_URL, wsActions, false) as any,
    socketMiddleware(WS_AUTH_URL, wsAuthActions, true) as any,
  ),
);

export const store = createStore(rootReducer as any, enhancer as any);