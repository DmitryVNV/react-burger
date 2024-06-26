import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import { useEffect, useState } from "react";
import { API_URL } from "../../utils/data";

function App() {
  const [data, setData] = useState([]);
  const [hasError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [modal, setModal] = useState({
    visible: false,
    title: null,
    content: null,
  });

  const apiURL = API_URL + "/ingredients";

  useEffect(() => {
    fetch(apiURL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Невозможно загрузить ингредиенты");
      })
      .then((data) => {
        data.success ? setData(data.data) : setError(true);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
      });
  }, [apiURL]);

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
          {!isLoading && !hasError && data.length && (
            <>
              <BurgerIngredients data={data} setModal={setModal} />
              <BurgerConstructor data={data} setModal={setModal} />
            </>
          )}
        </div>
        {modal.visible && (
          <Modal setModal={setModal} title={modal.title}>
            {modal.content}
          </Modal>
        )}
      </main>
    </>
  );
}

export default App;