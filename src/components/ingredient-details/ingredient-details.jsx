import styles from "./ingredient-details.module.css";
import React, { memo, useEffect, useState } from "react";
import { responseIngredients } from "../../utils/api";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

const Nutritions = (props) => {
  return (
    <li>
      {props.name}
      <span className="text_type_digits-default mt-2">{props.data}</span>
    </li>
  );
};

const IngredientDetails = (props) => {
  const [currentIngredients, setViewedIngredient] = useState({
    image_large: "",
    name: "",
    calories: "",
    proteins: "",
    fat: "",
    carbohydrates: "",
    isLoading: false,
  });

  const { id } = useParams();
  const finalId = id != null ? id : props.data._id;

  useEffect(() => {
    setViewedIngredient((currentIngredients) => {
      return {
        ...currentIngredients,
        isLoading: true,
      };
    });
    responseIngredients()
      .then((data) => {
        const ingredient = data.find((el) => el._id === finalId);
        setViewedIngredient({
          image_large: ingredient.image_large,
          name: ingredient.name,
          calories: ingredient.calories,
          proteins: ingredient.proteins,
          fat: ingredient.fat,
          carbohydrates: ingredient.carbohydrates,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        setViewedIngredient((currentIngredients) => {
          return {
            ...currentIngredients,
            isLoading: false,
          };
        });
      });
  }, [finalId]);

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

IngredientDetails.propTypes = {
  title: PropTypes.string,
};