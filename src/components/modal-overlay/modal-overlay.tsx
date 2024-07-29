import { FC } from "react";
import styles from "./modal-overlay.module.css";

type TModalClose = {
  closeModalWindow: (e: React.MouseEvent<HTMLElement> | KeyboardEvent) => void,
};

const ModalOverlay: FC<TModalClose> = (props) => {
  return <div className={styles.overlay} onClick={props.closeModalWindow} />;
};

export default ModalOverlay;