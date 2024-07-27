import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { modalReducer } from "./modal";
import { orderReducer } from "./order";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  modal: modalReducer,
  order: orderReducer,
  user: userReducer,
});