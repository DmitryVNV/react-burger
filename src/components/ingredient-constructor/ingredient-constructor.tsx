import React, { FC, MutableRefObject, useRef } from "react";
import styles from "./ingredient-constructor.module.css";
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "../../services/hooks";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { DELETE_INGREDIENT, EXCHANGE_INGREDIENTS } from "../../services/constants/ingredients";
import { IIngredientExtended } from "../../services/types";

type TConstructorIngredient = {
  ingredient: IIngredientExtended;
  index: number;
};

const ConstructorIngredient: FC<TConstructorIngredient> = (props) => {
  const { ingredient, index } = props;
  const dispatch = useDispatch();
  const dragRef = useRef<HTMLLIElement>(null) as MutableRefObject<HTMLLIElement>;

  const removeIngredient = (id: string) => {
    dispatch({
      id: id,
      type: DELETE_INGREDIENT,
    });
  };

  const [handlerId, drop] = useDrop<IIngredientExtended>({
    accept: "dragIngredient",
    collect(monitor: DropTargetMonitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: IIngredientExtended, monitor: DropTargetMonitor) {
      if (!dragRef.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const boundingClientRect = dragRef.current?.getBoundingClientRect();
      const middleY = (boundingClientRect.bottom - boundingClientRect.top) / 2;
      const offset = monitor.getClientOffset();
      if (offset) {
        const clientY = offset.y - boundingClientRect.top;

        if (dragIndex < hoverIndex && clientY < middleY) return;
        if (dragIndex > hoverIndex && clientY > middleY) return;

        dispatch({
          type: EXCHANGE_INGREDIENTS,
          fromIndex: dragIndex ?? index,
          toIndex: hoverIndex,
        });

        item.index = hoverIndex;
      }
    },
  });

  const [{ opacity }, drag] = useDrag({
    type: "dragIngredient",
    item: () => {
      return { ingredient, index };
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.3 : 1,
    }),
  });

  drag(drop(dragRef));

  return (
    <li ref={dragRef} className={`${styles.ingredient} mb-2`} style={{ opacity }} data-handler-id={handlerId}>
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