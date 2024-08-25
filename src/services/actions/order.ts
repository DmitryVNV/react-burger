import { sendOrder } from "../../utils/api";

import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILED, DELETE_ORDER } from "../constants/order";
import { TAppDispatch, TAppThunk, TOrder } from "../types";

export interface ICreateOrderRequestAction {
  readonly type: typeof CREATE_ORDER_REQUEST;
}
export interface ICreateOrderSuccessAction {
  readonly type: typeof CREATE_ORDER_SUCCESS;
  readonly order: TOrder;
}
export interface ICreateOrderFailedAction {
  readonly type: typeof CREATE_ORDER_FAILED;
  readonly error: string;
}
export interface IDeleteOrderAction {
  readonly type: typeof DELETE_ORDER;
}

export type TOrderActions = ICreateOrderRequestAction | ICreateOrderSuccessAction | ICreateOrderFailedAction | IDeleteOrderAction;

export const sendOrderEnhancer: TAppThunk = (ingredientIds: Array<string>) => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });
    sendOrder(ingredientIds)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: CREATE_ORDER_SUCCESS,
            order: res,
          });
        } else {
          dispatch({
            type: CREATE_ORDER_FAILED,
			error: "Ошибка создания заказа",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: CREATE_ORDER_FAILED,
          error: err.message,
        });
      });
  };
};