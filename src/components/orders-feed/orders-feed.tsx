import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import OrdersItem from "../orders-item/orders-item";
import { useSelector } from "../../services/hooks";
import styles from "./orders-feed.module.css";
import { TWsOrder } from "../../services/types";

function OrdersFeed() {
  const location = useLocation();
  const { orders } = useSelector((store) => store.ws);

  return (
    <section className={styles.component}>
      <h1 className="text text_type_main-large mt-8 mb-5">Лента заказов</h1>
      <ul className={styles.ul}>
        {orders?.map((el: TWsOrder) => (
          <li className={`${styles.li} mb-4`} key={el._id}>
            <Link to={`/feed/${el.number}`} state={{ background: location }} className={styles.link}>
              <OrdersItem
                number={el.number}
                name={el.name}
                ingredients={el.ingredients}
                createdAt={el.createdAt}
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default memo(OrdersFeed);