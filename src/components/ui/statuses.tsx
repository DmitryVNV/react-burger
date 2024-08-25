import { memo, FC } from "react";
import styles from "./ui.module.css";

const getOrderStatus = (status: string) => {
  return status === "done" ? "Выполнен" : status === "pending" ? "Отменен" : "Готовится";
};

type TStatusTitleProps = {
  status: string;
};
const StatusTitle: FC<TStatusTitleProps> = (props) => {
  const orderStatus = getOrderStatus(props.status);
  return (
    <span
      className={`${props.status === "done" ? styles.text_done : props.status === "pending" ? styles.text_pending : null} text text_type_main-default`}
    >
      {orderStatus}
    </span>
  );
};

export default memo(StatusTitle);