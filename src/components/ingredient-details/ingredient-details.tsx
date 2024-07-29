import styles from "./ingredient-details.module.css";
import React, { memo, useEffect, useState, FC } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { INutritions, IIngredientDetails, IIngredient, TViewedIngredient } from "../../utils/types";

const Nutritions: FC<INutritions> = (props) => {
  return (
    <li>
      {props.name}
      <span className="text_type_digits-default mt-2">{props.data}</span>
    </li>
  );
};

const IngredientDetails: FC<IIngredientDetails> = (props) => {
  const [currentIngredients, setViewedIngredient] = useState<TViewedIngredient>({
    image_large: "",
    name: "",
    calories: 0,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    isLoading: false,
  });
  const ingredients = useSelector((store: any) => store.ingredients.ingredientData);

  const { id } = useParams<string>();
  const finalId = id != null ? id : props.data?._id;

  useEffect(() => {
    if (!ingredients || ingredients.length === 0) {
      return;
    }

    setViewedIngredient((currentIngredients) => ({
      ...currentIngredients,
      isLoading: true,
    }));

    const ingredient = ingredients.find((el: IIngredient) => el._id === finalId);
    if (ingredient) {
      setViewedIngredient({
        image_large: ingredient.image_large,
        name: ingredient.name,
        calories: ingredient.calories,
        proteins: ingredient.proteins,
        fat: ingredient.fat,
        carbohydrates: ingredient.carbohydrates,
        isLoading: false,
      });
    } else {
      setViewedIngredient((currentIngredients) => ({
        ...currentIngredients,
        isLoading: false,
      }));
    }
  }, [finalId, ingredients]);

  return (
    <section className={styles.ingredient}>
      <h1 className="text text_type_main-large mt-10 pt-3">{props.title}</h1>
      <img src={currentIngredients.image_large} alt={currentIngredients.name} />
      <div className="text text_type_main-medium mb-8 mt-4">{currentIngredients.name}</div>
      <ul className="text text_type_main-default text_color_inactive mb-15">
        <Nutritions name="Калории, ккал" data={currentIngredients.calories} />
        <Nutritions name="Белки, г" data={currentIngredients.proteins} />
        <Nutritions name="Жиры, г" data={currentIngredients.fat} />
        <Nutritions name="Углеводы, г" data={currentIngredients.carbohydrates} />
      </ul>
    </section>
  );
};

export default memo(IngredientDetails);