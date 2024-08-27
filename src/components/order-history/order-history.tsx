import React, { memo, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import OrdersItem from '../orders-item/orders-item';
import { useSelector, useDispatch } from "../../services/hooks";
import { TWsOrder } from '../../services/types';
import styles from './order-history.module.css';
import { WS_CONNECTION_CLOSE_AUTH, WS_CONNECTION_START_AUTH } from '../../services/constants/ws-auth-actions';

const OrderHistory = memo(() => {
  const location = useLocation();
  const { orders } = useSelector((store) => store.wsAuth);
  const dispatch = useDispatch();

  const sortOrders = useCallback(() => {
    return orders?.sort((a: TWsOrder, b: TWsOrder) => b.number - a.number);
  }, [orders]);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_AUTH });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE_AUTH });
    };
  }, [dispatch]);

  const sortedOrders = sortOrders();

  return (
    <section className={styles.component}>
      <ul className={styles.ul}>
        {sortedOrders?.map((order: TWsOrder) => (
          <li className={`${styles.li} mb-4`} key={order._id}>
            <Link
              to={`/profile/orders/${order.number}`}
              state={{ background: location }}
              className={styles.link}
            >
              <OrdersItem
                number={order.number}
                name={order.name}
                ingredients={order.ingredients}
                createdAt={order.createdAt}
                status={order.status}
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
});

export default OrderHistory;