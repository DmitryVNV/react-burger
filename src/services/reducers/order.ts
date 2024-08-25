import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  DELETE_ORDER,
} from "../constants/order";
import { TOrderActions } from "../actions/order";
import { TOrder } from "../types";

export type TOrderState = {
  order: TOrder | null;
  orderIsLoading: boolean;
  orderSuccess: boolean;
  orderError: string;
};

const initialState: TOrderState = {
  order: null,
  orderIsLoading: false,
  orderSuccess: false,
  orderError: "",
};

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        orderIsLoading: true,
        orderError: "",
      };
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        orderIsLoading: false,
        orderError: "",
        order: action.order,
      };
    }
    case CREATE_ORDER_FAILED: {
      return { ...state, order: null, orderIsLoading: false, orderError: action.error };
    }
    case DELETE_ORDER: {
      return { ...state, order: null };
    }

    default: {
      return state;
    }
  }
};