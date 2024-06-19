import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { dataBurger } from "../../utils/data";

function App() {
  return (
    <>
      <AppHeader />
      <main>
        <div className={styles.content}>
          <BurgerIngredients data={dataBurger} />
          <BurgerConstructor data={dataBurger} />
        </div>
      </main>
    </>
  );
}

export default App;