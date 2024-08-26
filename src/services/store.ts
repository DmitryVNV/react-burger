import { applyMiddleware, createStore, compose, Store, Middleware } from "redux";
import { thunk, ThunkDispatch } from "redux-thunk";
import { rootReducer } from "./reducers";
import { socketMiddleware } from "./middleware";
import { wsActions } from "./actions/ws-actions";
import { wsAuthActions } from "./actions/ws-auth-actions";
import { WS_URL, WS_AUTH_URL } from "../utils/api";
import { RootState } from "./types";
import { AnyAction } from "redux";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const enhancerComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

type TSocketMiddleware = Middleware<{}, RootState>;

const enhancer = enhancerComposer(
  applyMiddleware(
    thunk,
    socketMiddleware(WS_URL, wsActions, false) as TSocketMiddleware,
    socketMiddleware(WS_AUTH_URL, wsAuthActions, true) as TSocketMiddleware,
  ),
);

export const store: Store<RootState> & {
  dispatch: ThunkDispatch<RootState, unknown, AnyAction>;
} = createStore(rootReducer as any, enhancer as any);