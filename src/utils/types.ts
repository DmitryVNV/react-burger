import { MutableRefObject } from "react";

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

export interface IIngredientWithUuid extends IIngredient {
  _uuid: string;
  index: number;
}
export type TViewedIngredient = Pick<
  IIngredient,
  "name" | "image_large" | "calories" | "proteins" | "fat" | "carbohydrates"
> & { isLoading: boolean };

export interface IIngredientTypes {
  title: string;
  data: Array<IIngredient>;
  typeId: string;
  innerRef: MutableRefObject<HTMLParagraphElement>;
}

export interface IIngredientInfo {
  data: IIngredient;
}

export interface IIngredientDetails {
  title?: string;
  data?: any;
}

export type TIngredientsData = {
  data: Array<IIngredient>;
};

export interface INutritions {
  name: string;
  data: number;
}

export type TUser = {
  name: string;
  email: string;
  password: string;
};

export type TTarget = { target: { name: string; value: string } };
export type TNewPassword = { newPassword: string; token: string };
export type TTokenBody = { token: string | undefined };

export type TCheckSuccess<T> = T & {
  success: boolean;
  message: string;
};