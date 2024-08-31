import { useEffect, ReactNode, FC } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

const root = document.getElementById("modals") as HTMLFormElement;

type TModalProps = {
  title?: string;
  closeModalWindow: (e: React.MouseEvent<HTMLElement>|KeyboardEvent) => void;
  children: ReactNode;
}

const Modal: FC<TModalProps> = (props) => {
  const closeByEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") props.closeModalWindow(e);
  };

  useEffect(() => {
    window.addEventListener("keydown", closeByEscape);
    return () => {
      window.removeEventListener("keydown", closeByEscape);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className="modalHeader">
          <h1 className="mt-10 ml-10 pt-3 text text_type_main-large">
            {props.title}
          </h1>
          <div className={styles.closeBtn} onClick={props.closeModalWindow} data-cy="close-modal">
            <CloseIcon type="primary" />
          </div>
        </div>
        <div className={`${styles.content} mt-10`}>{props.children}</div>
      </div>
      <ModalOverlay closeModalWindow={props.closeModalWindow} />
    </>,
    root,
  );
};

export default Modal;