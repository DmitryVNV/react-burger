import React, { useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import Modal from "../modal/modal";
import { CLOSE_MODAL } from "../../services/actions/modal";
import { VIEWED_INGREDIENT } from "../../services/actions/ingredients";

import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { getIngredientsEnhancer } from "../../services/actions/ingredients";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const { isLoading, hasError, currentIngredients } = useSelector(
    (store) => store.ingredients,
  );
  const { isModalVisible, modalTitle, modalContent } = useSelector(
    (store) => store.modal,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsEnhancer());
  }, [dispatch]);

  const closeModal = () => {
    dispatch({
      type: CLOSE_MODAL,
    });
    currentIngredients &&
      dispatch({
        type: VIEWED_INGREDIENT,
        item: null,
      });
  };

  return (
    <>
      <AppHeader />
      <main>
        <div className={styles.content}>
          {isLoading && (
            <div className={`${styles.notification} text text_type_main-medium`}>
              Загрузка
            </div>
          )}
          {hasError && (
            <div className={`${styles.error} text text_type_main-medium`}>
              Ошибка при загрузке ингредиентов
            </div>
          )}
          {!isLoading && !hasError && (
            <>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
            </>
          )}
        </div>
        {isModalVisible && (
          <Modal closeModalWindow={closeModal} title={modalTitle}>
            {modalContent}
          </Modal>
        )}
      </main>
    </>
  );
}

export default App;