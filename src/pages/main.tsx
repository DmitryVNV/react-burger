import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import Modal from "../components/modal/modal";

import { VIEWED_INGREDIENT, CLEAR_DATA } from "../services/actions/ingredients";

import { CLOSE_MODAL } from "../services/actions/modal";
import { DELETE_ORDER } from "../services/actions/order";

import styles from "./main.module.css";

function MainPage() {
  const { isLoading, hasError, currentViewedIngredient } = useSelector((store: any) => store.ingredients);
  const { isModalVisible, modalTitle, modalContent } = useSelector((store: any) => store.modal);
  const { order } = useSelector((store: any) => store.order);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({
      type: CLOSE_MODAL,
    });
    dispatch({
      type: DELETE_ORDER,
    });
    currentViewedIngredient &&
      dispatch({
        type: VIEWED_INGREDIENT,
        item: null,
      });
  };
  useEffect(() => {
    if (order.success) {
      dispatch({
        type: CLEAR_DATA,
      });
    }
  }, [order, dispatch]);
  return (
    <main>
      <div>
        {isLoading && <div className={`${styles.notification} text text_type_main-medium`}>Загрузка...</div>}
        {hasError && <div className={`${styles.error} text text_type_main-medium`}>Произошла ошибка</div>}
        {!isLoading && !hasError && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        )}
      </div>
      {isModalVisible && (
        <Modal title={modalTitle} closeModalWindow={closeModal}>
          {modalContent}
        </Modal>
      )}
    </main>
  );
}

export default MainPage;