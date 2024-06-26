import React from "react";
import styles from "./burger-constructor.module.css";
import {
  DragIcon,
  CurrencyIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { burgerPropTypes } from "../../utils/propTypes";
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";

const BurgerConstructor = ({ setModal, data }) => {
  const bunProps = data.find(
    (ingredient) => (ingredient.id = "643d69a5c3f7b9001cfa093c"),
  );
  const ingredientsId = [
    "643d69a5c3f7b9001cfa093e",
    "643d69a5c3f7b9001cfa0942",
    "643d69a5c3f7b9001cfa0946",
    "643d69a5c3f7b9001cfa0949",
    "643d69a5c3f7b9001cfa094a",
  ];

  const modalOpen = () => {
    setModal({
      visible: true,
      content: <OrderDetails orderNumber="012345" />,
    });
  };

  return (
    <div className={`${styles.constructor}`}>
      <div className="mt-25 mb-4 ml-4 mr-4 pl-8">
        <ConstructorElement
          text={bunProps.name + " (верх)"}
          price={bunProps.price}
          thumbnail={bunProps.image}
          type="top"
          isLocked="true"
        />
      </div>

      <div className={`${styles.scroll}`}>
        {data.map((ingredient, id) =>
          ingredientsId.includes(ingredient._id) ? (
            <div className={`${styles.ingredient} ml-4 mr-4 mb-4 `} key={id}>
              <DragIcon type="primary" />
              <i className="ml-2" />
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </div>
          ) : (
            ""
          ),
        )}
      </div>

      <div className="mt-4 ml-4 mr-4 pl-8">
        <ConstructorElement
          text={bunProps.name + " (низ)"}
          price={bunProps.price}
          thumbnail={bunProps.image}
          type="bottom"
          isLocked="true"
        />
      </div>

      <div className={`${styles.submit_block}`}>
        <div className={`${styles.submit_button} pr-4`}>
          <div className="price">
            <span className="text text_type_digits-medium mr-2">1423</span>
            <CurrencyIcon />
          </div>

          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={modalOpen}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(burgerPropTypes.isRequired),
  setModal: PropTypes.func.isRequired,
};