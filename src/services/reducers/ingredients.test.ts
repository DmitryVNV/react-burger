import { ingredientsReducer, mainState } from "./ingredients";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  EXCHANGE_INGREDIENTS,
  VIEWED_INGREDIENT,
  CLEAR_DATA,
} from "../constants/ingredients";
import { TIngredientsActions } from "../actions/ingredients";

describe("Ingredient reducer", () => {
  const ingredient = {
    _id: "",
    name: "",
    type: "",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: "",
    image_mobile: "",
    image_large: "",
    _uuid: "",
    index: 0,
  };
  it("Return the initial state", () => {
    expect(ingredientsReducer(undefined, {} as TIngredientsActions)).toEqual(mainState);
  });
  it("Check if handle GET_INGREDIENTS_REQUEST", () => {
    const state = {
      ...mainState,
      isLoading: true,
      hasError: false,
    };
    expect(
      ingredientsReducer(undefined, {
        type: GET_INGREDIENTS_REQUEST,
      })
    ).toEqual(state);
  });
  it("Check if handle GET_INGREDIENTS_SUCCESS", () => {
    const state = {
      ...mainState,
      hasError: false,
      isLoading: false,
      ingredientData: [],
    };
    expect(ingredientsReducer(undefined, { type: GET_INGREDIENTS_SUCCESS, items: [] })).toEqual(state);
  });
  it("Check if handle GET_INGREDIENTS_FAILED", () => {
    const state = {
      ...mainState,
      ingredientData: [],
      constructorData: { bun: null, ingredients: [] },
      hasError: true,
      isLoading: false,
    };
    expect(ingredientsReducer(undefined, { type: GET_INGREDIENTS_FAILED })).toEqual(state);
  });
  it("Check if handle ADD_INGREDIENT", () => {
    const state = {
      ...mainState,
      constructorData: {
        bun: null,
        ingredients: [ingredient],
      },
    };
    expect(ingredientsReducer(undefined, { type: ADD_INGREDIENT, item: ingredient })).toEqual(state);
  });
  it("Check if handle DELETE_INGREDIENT", () => {
    const state = {
      ...mainState,
      constructorData: {
        bun: null,
        ingredients: [],
      },
    };
    expect(ingredientsReducer(undefined, { type: DELETE_INGREDIENT, id: "" })).toEqual(state);
  });
  it("Check if handle EXCHANGE_INGREDIENTS", () => {
    const state = {
      ...mainState,
      constructorData: {
        ...mainState.constructorData,
        ingredients: [undefined],
        undefined,
      },
    };
    expect(ingredientsReducer(undefined, { type: EXCHANGE_INGREDIENTS, fromIndex: 0, toIndex: 1 })).toEqual(state);
  });
  it("Check if handle VIEWED_INGREDIENT", () => {
    const state = {
      ...mainState,
      currentIngredients: ingredient,
    };
    expect(ingredientsReducer(undefined, { type: VIEWED_INGREDIENT, item: ingredient })).toEqual(state);
  });
  it("Check if handle CLEAR_DATA", () => {
    const state = {
      ...mainState,
      constructorData: { bun: null, ingredients: [] },
    };
    expect(ingredientsReducer(undefined, { type: CLEAR_DATA })).toEqual(state);
  });
});
