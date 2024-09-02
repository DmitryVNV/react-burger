import { orderReducer, initialState } from "./order";
import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILED, DELETE_ORDER } from "../constants/order";
import { TOrderActions } from "../actions/order";

describe("order reducer", () => {
  it("Return the initial state", () => {
    expect(orderReducer(undefined, {} as TOrderActions)).toEqual(initialState);
  });
  it("Check if handle CREATE_ORDER_REQUEST", () => {
    const state = {
      ...initialState,
      order: null,
      orderIsLoading: true,
      orderSuccess: false,
      orderError: "",
    };
    expect(
      orderReducer(undefined, {
        type: CREATE_ORDER_REQUEST,
      })
    ).toEqual(state);
  });
  it("Check if handle CREATE_ORDER_SUCCESS", () => {
    const orderTest = {
      name: "",
      order: {
        ingredients: [],
        _id: "",
        owner: {
          email: "",
          name: "",
          createdAt: new Date(0),
          updatedAt: new Date(0),
        },
        status: "",
        name: "",
        createdAt: new Date(0),
        updatedAt: new Date(0),
        number: 0,
        price: 0,
      },
    };
    const state = {
      ...initialState,
      order: orderTest,
      orderIsLoading: false,
      orderSuccess: false,
      orderError: "",
    };
    expect(orderReducer(undefined, { type: CREATE_ORDER_SUCCESS, order: orderTest })).toEqual(state);
  });
  it("Check if handle CREATE_ORDER_FAILED", () => {
    const state = {
      ...initialState,
      order: null,
      orderIsLoading: false,
      orderError: "",
    };
    expect(orderReducer(undefined, { type: CREATE_ORDER_FAILED, error: "" })).toEqual(state);
  });
  it("Check if handle DELETE_ORDER", () => {
    const state = {
      ...initialState,
      order: null,
    };
    expect(orderReducer(undefined, { type: DELETE_ORDER })).toEqual(state);
  });
});
