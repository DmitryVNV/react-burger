import { sendOrder } from "../../utils/api";

export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILED = "CREATE_ORDER_FAILED";
export const DELETE_ORDER = "DELETE_ORDER";

export const sendOrderEnhancer = (ingredientIds: any) => {
  return function (dispatch: any) {
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