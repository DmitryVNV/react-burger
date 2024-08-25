import React, { memo } from "react";
import { useSelector } from "../../services/hooks";
import { TWsOrder } from "../../services/types";
import styles from "./orders-board.module.css";

export type TStatusArrays = {
  done: Array<TWsOrder>;
  pending: Array<TWsOrder>;
};

const filterOrdersByStatus = (arr: Array<TWsOrder>) => {
  return arr?.reduce(
    (acc: { [name: string]: Array<TWsOrder> }, curr) => {
      curr.status === "done"
        ? (acc["done"] = [...acc["done"], curr])
        : (acc["pending"] = [...acc["pending"], curr]);
      return acc;
    },
    { done: [], pending: [] },
  );
};

const OrdersBoard = () => {
  const { total, totalToday, orders } = useSelector((store: any) => store.ws);
  const statusArrays = filterOrdersByStatus(orders);
  const doneArray = statusArrays?.done;
  return (
    <section className={`${styles.component} pl-10 mt-10`}>
      <div className={styles.table}>
        <div>
          <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
          <ul className={`${styles.ul} ${styles.ul_done} text text_type_digits-default`}>
            {doneArray?.slice(0, 35).map((el: TWsOrder) => (
              <li key={el._id} className={`${styles.li} mb-2 mr-2`}>
                {el.number}
              </li>
            ))}
          </ul>
        </div>
        <div className="ml-20">
          <h2 className="text text_type_main-medium mb-6">В работе:</h2>
          <ul className={`${styles.ul} text text_type_digits-default`}>
            {statusArrays?.pending.slice(0, 35).map((el: TWsOrder) => (
              <li key={el._id} className={`${styles.li} mb-2 mr-2`}>
                {el.number}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
        <span className={`${styles.count} text text_type_digits-large`}>{total || 0}</span>
      </div>
      <div>
        <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
        <span className={`${styles.count} text text_type_digits-large`}>{totalToday || 0}</span>
      </div>
    </section>
  );
};

export default memo(OrdersBoard);