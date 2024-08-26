import { MutableRefObject } from "react";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action, ActionCreator, Dispatch } from "redux";
import { store } from "./store";
import { TIngredientsActions } from "./actions/ingredients";
import { TOrderActions } from "./actions/order";
import { TModalActions } from "./actions/modal";
import { TUserActions } from "./actions/user";
import { TWSActions } from "./actions/ws-actions";
import { TWSAuthActions } from "./actions/ws-auth-actions";
import { rootReducer } from "./reducers";

import "redux-thunk/extend-redux";

type TApplicationActions =
  | TIngredientsActions
  | TOrderActions
  | TModalActions
  | TUserActions
  | TWSActions
  | TWSAuthActions;

export type RootState = ReturnType<typeof rootReducer>;

export type TAppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;
export type TAppThunk<TReturn = void> = ThunkAction<TReturn, RootState, unknown, TApplicationActions>;

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
}

export interface IIngredientExtended extends IIngredient {
  _uuid: string;
  index: number;
}
export type TViewedIngredient = Pick<
  IIngredient,
  "name" | "image_large" | "calories" | "proteins" | "fat" | "carbohydrates"
> & { isLoading: boolean };

export interface ICurrentViewedIngredient {
  image_large: string;
  name: string;
  calories: string;
  proteins: string;
  fat: string;
  carbohydrates: string;
  isLoading: boolean;
}

export interface IIngredientTypes {
  title: string;
  data: Array<IIngredient>;
  typeId: string;
  innerRef: MutableRefObject<HTMLParagraphElement>;
}

export interface INutritionFact {
  name: string;
  fact: number;
}

export interface INutritions {
  name: string;
  data: number;
}

export interface IIngredientDetails {
  title?: string;
  data?: IIngredient;
}
export interface IParamTypes {
  id: string;
}

export interface IIngredientInfo {
  data: IIngredient;
}

export interface OrderState {
  order: TOrder | null;
}

export type TUser = {
  name: string;
  email: string;
  password: string;
};

export type TTarget = { target: { name: string; value: string } };

export type TNewPassword = { newPassword: string; token: string };
export type TTokenBody = { token: string | undefined };

export type TOrder = {
  name: string;
  order: {
    ingredients: Array<IIngredient>;
    _id: string;
    owner: {
      email: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
    };
    status: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    number: number;
    price: number;
  };
};

export type TCheckSuccess<T> = T & {
  success: boolean;
  message: string;
};

export type TIngredientsData = {
  data: Array<IIngredient>;
};

export type TWsAction = {
  wsInit: string;
  wsClose: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};

export type TWsOrder = {
  ingredients: Array<string>;
  _id: string;
  status: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  number: number;
};

export type TWsOrders = {
  success: boolean;
  orders: Array<TWsOrder>;
  total: number;
  totalToday: number;
};