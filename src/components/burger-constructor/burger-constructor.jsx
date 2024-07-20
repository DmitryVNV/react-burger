import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorIngredient from "../ingredient-constructor/ingredient-constructor";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { ADD_INGREDIENT } from "../../services/actions/ingredients";
import { OPEN_MODAL } from "../../services/actions/modal";
import { sendOrderEnhancer } from "../../services/actions/order";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch({
        type: ADD_INGREDIENT,
        item,
      });
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });
  const { isAuthenthicated } = useSelector((store) => store.user);
  const { constructorData } = useSelector((store) => store.ingredients);
  const { order, orderError, orderIsLoading } = useSelector(
    (store) => store.order
  );
  const bun = constructorData.bun;
  const ingredients = constructorData.ingredients;
  const navigate = useNavigate();
  
  const modalOpen = async () => {
    if (isAuthenthicated) {
      const ingredientIds = [
        bun._id,
        ...ingredients.map((ingredient) => ingredient._id),
      ];
      dispatch(sendOrderEnhancer(ingredientIds));
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (order?.order?.number > 0) {
      dispatch({
        type: OPEN_MODAL,
        modalContent: <OrderDetails orderNumber={order.order.number} />,
      });
    }
  }, [order]);

  useEffect(() => {
    if (orderError) {
      dispatch({
        type: OPEN_MODAL,
        modalTitle: "Ошибка",
        modalContent: (
          <div className="ml-10 mr-10 mb-20">
            Заказ не создан, подробности ошибки:
            <br />
            <b>{orderError}</b>
          </div>
        ),
      });
    }
  }, [orderError]);

  const [totalPrice, setTotalPrice] = useState(0);
  
  useEffect(() => {
    const ingredientsPrice = constructorData.ingredients?.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0,
    );
    const bunPrice = constructorData.bun?.price || 0;
    const newTotalPrice = ingredientsPrice + bunPrice * 2;

    if (totalPrice !== newTotalPrice) {
      setTotalPrice(newTotalPrice);
    }
  }, [constructorData]);
  
  return (
    <div
      className={`${styles.constructor} ${isHover ? styles.onHover : ""}`}
      ref={dropTarget}
    >
      <div className="mt-25 mb-4 ml-4 mr-4 pl-8">
        {bun && (
          <ConstructorElement
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image}
			type="top"
            isLocked="true"
          />
        )}
      </div>
	  <div className={`${styles.scroll}`}>
        {constructorData.ingredients.length === 0 && !bun && (
          <div className="text text_type_main-medium ml-30 mb-8">
            Перетащите сюда ингредиенты
          </div>
        )}
        {ingredients.map((ingredient, i) => (
		  <div key={i} className={`${styles.ingredient} ml-10 mr-4`}>
          <ConstructorIngredient
            ingredient={ingredient}
            index={i}
            key={ingredient._uuid}
          />
		 </div>
        ))}
      </div>
     <div className="mt-4 ml-4 mr-4 pl-8">
        {bun && (
          <ConstructorElement
            text={bun.name + " (низ)"}
            price={bun.price}
            thumbnail={bun.image}
            type="bottom"
            isLocked="true"
          />
        )}
      </div>
      <div className={`${styles.submit_block}`}>
        <div className={`${styles.submit_button} pr-4`}>
          <div className="price">
            <span className="text text_type_digits-medium mr-2">
              {totalPrice}
            </span>
            <CurrencyIcon />
          </div>

          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={modalOpen}
            disabled={orderIsLoading || bun === null ? true : false}
          >
            {orderIsLoading ? "Оформление...." : "Оформить заказ"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BurgerConstructor);