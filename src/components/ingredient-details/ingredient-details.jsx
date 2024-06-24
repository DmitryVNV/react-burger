import styles from "./ingredient-details.module.css";
import { burgerPropTypes } from "../../utils/propTypes";

const Nutritions = (props) => {
  return (
    <li>
      {props.name}
      <span className="text_type_digits-default mt-2">{props.data}</span>
    </li>
  );
};

const IngredientDetails = (props) => {
  return (
    <section className={styles.ingredient}>
      <img src={props.data.image_large} alt={props.data.name} />
      <div className="text text_type_main-medium mb-8 mt-4">
        {props.data.name}
      </div>
      <ul className="text text_type_main-default text_color_inactive mb-15">
        <Nutritions name="Калории, ккал" data={props.data.calories} />
        <Nutritions name="Белки, г" data={props.data.proteins} />
        <Nutritions name="Жиры, г" data={props.data.fat} />
        <Nutritions name="Углеводы, г" data={props.data.carbohydrates} />
      </ul>
    </section>
  );
};

export default IngredientDetails;

IngredientDetails.propTypes = {
  data: burgerPropTypes.isRequired,
};