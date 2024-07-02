import { responseIngredients } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const EXCHANGE_INGREDIENTS = "EXCHANGE_INGREDIENTS";
export const VIEWED_INGREDIENT = "VIEWED_INGREDIENT";

export const getIngredientsEnhancer = () => {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    responseIngredients()
      .then((data) => {
        if (data) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            items: data,
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
};