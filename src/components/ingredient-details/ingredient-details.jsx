import styles from "./ingredient-details.module.css";
import { useSelector } from "react-redux";

const Nutritions = (props) => {
  return (
    <li>
      {props.name}
      <span className="text_type_digits-default mt-2">{props.data}</span>
    </li>
  );
};

const IngredientDetails = () => {
  const { currentIngredients } = useSelector((store) => store.ingredients);
  return (
    <section className={styles.ingredient}>
      <img src={currentIngredients.image_large} alt={currentIngredients.name} />
      <div className="text text_type_main-medium mb-8 mt-4">
        {currentIngredients.name}
      </div>
      <ul className="text text_type_main-default text_color_inactive mb-15">
        <Nutritions name="Калории, ккал" data={currentIngredients.calories} />
        <Nutritions name="Белки, г" data={currentIngredients.proteins} />
        <Nutritions name="Жиры, г" data={currentIngredients.fat} />
        <Nutritions name="Углеводы, г" data={currentIngredients.carbohydrates} />
      </ul>
    </section>
  );
};

export default IngredientDetails;