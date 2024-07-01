import React from "react";
import { useRef } from 'react';
import PropTypes from "prop-types";
import styles from "./ingredient-constructor.module.css";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { burgerPropTypes } from "../../utils/properties";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import {
  DELETE_INGREDIENT,
  EXCHANGE_INGREDIENTS,
} from "../../services/actions/ingredients";

const ConstructorIngredient = (props) => {
  const { ingredient, index } = props;
  const dispatch = useDispatch();
  const dragRef = useRef(null);

  const removeIngredient = (id) => {
    dispatch({
      id: id,
      type: DELETE_INGREDIENT,
    });
  };

  const [{ handlerId }, drop] = useDrop({
    accept: "dragIngredient",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!dragRef.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const boundingClientRect = dragRef.current?.getBoundingClientRect();
      const middleY = (boundingClientRect.bottom - boundingClientRect.top) / 2;
      const offset = monitor.getClientOffset();
      const clientY = offset.y - boundingClientRect.top;

      if (dragIndex < hoverIndex && clientY < middleY) return;
      if (dragIndex > hoverIndex && clientY > middleY) return;

      dispatch({
        type: EXCHANGE_INGREDIENTS,
        fromIndex: dragIndex ?? index,
        toIndex: hoverIndex,
      });

      item.index = hoverIndex;
    },
  });

  const [{ opacity }, drag] = useDrag({
    type: "dragIngredient",
    ingredient: () => {
      return { ingredient, index };
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.3 : 1,
    }),
  });

  drag(drop(dragRef));

  return (
    <li
      ref={dragRef}
      className={`${styles.ingredient} mb-2`}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <i className="ml-2" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => removeIngredient(ingredient._uuid)}
      />
    </li>
  );
};

export default React.memo(ConstructorIngredient);

ConstructorIngredient.propTypes = {
  ingredient: burgerPropTypes.isRequired,
  index: PropTypes.number.isRequired,
};