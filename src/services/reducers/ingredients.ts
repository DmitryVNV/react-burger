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

import { IIngredient } from "../types";
import { TIngredientsActions } from "../actions/ingredients";

interface IngredientsState {
  isLoading: boolean;
  hasError: boolean;
  ingredientData: IIngredient[];
  constructorData: {
    bun: IIngredient | null;
    ingredients: IIngredient[];
  };
  currentIngredients: IIngredient | {};
}

export const mainState: IngredientsState = {
  isLoading: false,
  hasError: false,
  ingredientData: [],
  constructorData: {
    bun: null,
    ingredients: [],
  },
  currentIngredients: {},
};

export const ingredientsReducer = (state = mainState, action: TIngredientsActions): IngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        hasError: false,
        isLoading: false,
        ingredientData: action.items,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ingredientData: [],
        constructorData: { bun: null, ingredients: [] },
        currentIngredients: {},
        hasError: true,
        isLoading: false,
      };
    }
    case ADD_INGREDIENT: {
      const { type } = action.item;
      if (type === "bun") {
        return {
          ...state,
          constructorData: {
            ...state.constructorData,
            bun: action.item,
          },
        };
      }
      return {
        ...state,
        constructorData: {
          ...state.constructorData,
          ingredients: [...state.constructorData.ingredients, action.item],
        },
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        constructorData: {
          ...state.constructorData,
          ingredients: [...state.constructorData.ingredients].filter(
            (ingredient) => ingredient._id !== action.id,
          ),
        },
      };
    }
    case EXCHANGE_INGREDIENTS: {
      const rearrangedIngredients = [...state.constructorData.ingredients];
      rearrangedIngredients.splice(action.toIndex, 0, rearrangedIngredients.splice(action.fromIndex, 1)[0]);
      return {
        ...state,
        constructorData: {
          ...state.constructorData,
          ingredients: rearrangedIngredients,
        },
      };
    }
    case VIEWED_INGREDIENT: {
      return {
        ...state,
        currentIngredients: action.item,
      };
    }
    case CLEAR_DATA: {
      return { ...state, constructorData: { bun: null, ingredients: [] } };
    }
    default: {
      return state;
    }
  }
};