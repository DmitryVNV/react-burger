import React, { memo, FC } from "react";
import { useSelector } from "../../services/hooks";
import { IIngredient } from "../../services/types";
import DateTitle from "../ui/date-title";
import Price from "../ui/price";
import RoundThumb from "../ui/thumbs";
import StatusTitle from "../ui/statuses";
import styles from "./orders-item.module.css";

type TProps = {
  number: number;
  name: string;
  ingredients: Array<string>;
  createdAt: Date;
  status?: string;
};

const getBurgerIngredients = (ingredientsId: Array<string>, ingredientData: Array<IIngredient>) =>
  ingredientsId?.map((id: string) => ingredientData.filter((item: IIngredient) => item._id === id))?.flat();

const getOrderPrice = (arr: Array<IIngredient>) =>
  arr?.reduce((acc: number, curr: IIngredient) => (acc += curr.price), 0);

const OrdersItem: FC<TProps> = ({ number, name, ingredients, createdAt, status }) => {
  const { ingredientData } = useSelector((store) => store.ingredients);
  const burgerIngredients = getBurgerIngredients(ingredients, ingredientData);
  const orderPrice = getOrderPrice(burgerIngredients);

  const numItems = 7;
  const burgerItem = burgerIngredients.slice(0, numItems);
  const count = burgerIngredients.length;
  let zIndex = numItems;
  const numberIngredients = count - numItems;

  return (
    <div className={`${styles.component} p-5`}>
      <div className={styles.title}>
        <span className="text text_type_digits-default">#{number}</span>
        <DateTitle date={createdAt} />
      </div>
      <div>
        <h2 className="text text_type_main-medium mb-2">{name}</h2>
        {status && <StatusTitle status={status} />}
      </div>
      <div className={styles.title}>
        <ul className={styles.ul}>
          {burgerItem.map((el: IIngredient, i: number) => {
            zIndex -= 1;
            return (
              <li className={styles.li} key={i} style={{ zIndex: zIndex }}>
                <RoundThumb title={el.name} image={el.image_mobile} />
              </li>
            );
          })}
          {count > numItems && (
            <div className={styles.overlay}>
              <span>+{numberIngredients}</span>
            </div>
          )}
        </ul>
        <Price price={orderPrice} />
      </div>
    </div>
  );
};
export default memo(OrdersItem);