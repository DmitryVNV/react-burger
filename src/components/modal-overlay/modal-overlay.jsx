import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";

const ModalOverlay = (props) => {
  return <div className={styles.overlay} onClick={props.closeModalWindow} />;
};

export default ModalOverlay;

ModalOverlay.propTypes = {
  closeModalWindow: PropTypes.func.isRequired,
};