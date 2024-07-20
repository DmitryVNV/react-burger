import { memo, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserEnhancer } from "../services/actions/user";
import { NavLink, Routes, Route, useLocation, useMatch } from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderHistory from "../components/order-history/order-history";

import { logoutUserEnhancer } from "../services/actions/user";

import styles from "./profile.module.css";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const matchProfile = useMatch("/profile");
  const matchOrders = useMatch("/profile/orders");
  const pathname = useLocation().pathname;

  const onLogout = () => {
    dispatch(logoutUserEnhancer());
  };

  const { userData } = useSelector((store) => store.user);
  const [values, setValues] = useState({
    name: userData ? userData.name : "",
    email: userData ? userData.email : "",
    password: "",
  });

  const [isFormChange, setIsFormChange] = useState(false);

  const handleChange = useCallback((event) => {
    setIsFormChange(true);
    setValues((values) => {
      return { ...values, [event.target.name]: event.target.value };
    });
  }, []);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      dispatch(updateUserEnhancer(values.name, values.email, values.password));
      setIsFormChange(false);
      setValues({ ...values, password: "" });
    },
    [dispatch, values],
  );

  const handleCancel = useCallback(
    async (e) => {
      e.preventDefault();
      setIsFormChange(false);
      setValues((values) => {
        return { ...values, name: userData.name, email: userData.email };
      });
    },
    [userData.name, userData.email],
  );

  return (
    <main>
      <section className={styles.section}>
        <div className={styles.menuContainer}>
          <ul className="mt-30">
            <li>
              <p className={`text_type_main-medium pl-2 ${styles.link}`}>Профиль</p>
            </li>
            <li>
              <NavLink
                to="/profile/orders"
                className={`text_type_main-medium text_color_inactive pl-2 ${styles.link}`}
              >
                История заказов
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                exact="true"
                className={`text_type_main-medium pl-2 text_color_inactive ${styles.link}`}
                onClick={onLogout}
              >
                Выход
              </NavLink>
            </li>
          </ul>
          <p className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <Routes>
          <Route path="/profile" />
          <Route path="/profile/orders" element={<OrderHistory />} />
        </Routes>
        <div className={`${styles.userContainer} mt-20`}>
          <form className={`${styles.container} text`} onSubmit={onSubmit}>
            <Input
              type={"text"}
              placeholder={"Имя"}
              name={"name"}
              icon={"EditIcon"}
              size={"default"}
              value={values.name || ""}
              onChange={handleChange}
            />

            <div className="mt-6 mb-6">
              <Input
                type={"text"}
                placeholder={"Логин"}
                name={"email"}
                icon={"EditIcon"}
                size={"default"}
                value={values.email || ""}
                onChange={handleChange}
              />
            </div>
            <Input
              type={"password"}
              placeholder={"Пароль"}
              name={"password"}
              icon={"EditIcon"}
              size={"default"}
              value={values.password || ""}
              onChange={handleChange}
            />
            <div className="mt-6" style={{ visibility: isFormChange ? "visible" : "hidden" }}>
              <Button htmlType="reset" type="secondary" size="medium" name="cancel" onClick={handleCancel}>
                Отмена
              </Button>
              <Button htmlType="submit" type="primary" size="medium" name="save">
                Сохранить
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;