import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  DELETE_ORDER,
} from "../actions/order";

const mainState = {
  order: {},
  orderIsLoading: false,
  orderSuccess: false,
  orderError: "",
};

export const orderReducer = (state = mainState, action) => {
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
      return { order: {}, orderIsLoading: false, orderError: action.error };
    }
    case DELETE_ORDER: {
      return { ...state, order: {} };
    }

    default: {
      return state;
    }
  }
};