import { FC } from "react";
import styles from "./order-details.module.css";
import okImage from "../../images/ok.png";

type TOrderDetails = {
  orderNumber: number;
}
const OrderDetails: FC<TOrderDetails> = (props) => {
  return (
    <section className={styles.main}>
      <h1 className="mb-8 mt-20 text text_type_digits-large" data-cy="order-number">
        {props.orderNumber}
      </h1>
      <div className="text text_type_main-medium mb-15">
        идентификатор заказа
      </div>
      <div className={styles.ok}>
        <img className="mb-10 mt-10" src={okImage} alt="Готово" />
      </div>
      <div className="text text_type_main-default mt-15">
        Ваш заказ начали готовить
      </div>
      <div className="text text_type_main-default text_color_inactive mb-30 mt-2">
        Дождитесь готовности на орбитальной станции
      </div>
    </section>
  );
};

export default OrderDetails;