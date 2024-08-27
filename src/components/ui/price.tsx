import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { memo, FC } from "react";
import styles from "./ui.module.css";

type TPriceProps = {
  count?: number | undefined;
  price: number;
};
const Price: FC<TPriceProps> = (props) => {
  return (
    <div className={`${styles.price} text text_type_digits-default`}>
      {props.count && <span className="mr-1 text text_type_digits-default">{props.count} x </span>}
      <span className="mr-2">{props.price}</span>
      <CurrencyIcon type="primary" />
    </div>
  );
};

export default memo(Price);
