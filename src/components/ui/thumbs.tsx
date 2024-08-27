import { memo, FC } from "react";
import styles from "./ui.module.css";

type TRoundThumbProps = {
  image: string;
  title?: string | undefined;
};
const RoundThumb: FC<TRoundThumbProps> = (props) => {
  return (
    <div className={styles.icon} title={props.title}>
      <img src={props.image} className={styles.image} alt="Ингредиент" />
    </div>
  );
};

export default memo(RoundThumb);