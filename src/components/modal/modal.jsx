import { useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

const root = document.getElementById("modals");

const Modal = (props) => {
  const closeByEscape = (e) => {
    if (e.key === "Escape") props.closeModalWindow();
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
          <div className={styles.closeBtn} onClick={props.closeModalWindow}>
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

Modal.propTypes = {
  closeModalWindow: PropTypes.func.isRequired,
  title: PropTypes.string,
};