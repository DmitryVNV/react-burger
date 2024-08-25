import { AnyAction, MiddlewareAPI } from "redux";
import { TWsAction } from "../types";
import { getCookie } from "../../utils/api";

export const socketMiddleware = (wsUrl: string, wsActions: TWsAction, isProtected: boolean) => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;
    let reconnectAttempt = 0;

    const createSocket = (token?: string) => {
      const url = token ? `${wsUrl}?token=${token}` : wsUrl;
      socket = new WebSocket(url);
      reconnectAttempt = 0;
    };

    return (next: (i: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, wsClose, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit && !socket) {
        const token = isProtected ? getCookie("accessToken")?.substring(7) : undefined;
        createSocket(token);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          try {
            const parsedData = JSON.parse(event.data);
            dispatch({ type: onMessage, payload: parsedData });
          } catch (error) {
            console.error("Ошибка парсинга сообщения WebSocket: ", error);
          }
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
          socket = null;

          if (event.code !== 1000) {
            reconnectAttempt++;
            setTimeout(() => dispatch({ type: wsInit }), 1000 * reconnectAttempt);
          }
        };
      }

      if (type === wsClose && socket) {
        socket.close(1000, "Сокет закрыт по запросу");
      }

      next(action);
    };
  };
};