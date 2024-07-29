import { useState, useCallback, SyntheticEvent, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserEnhancer } from "../services/actions/user";
import { NavLink, Routes, Route } from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderHistory from "../components/order-history/order-history";
import { TUser } from "../utils/types";
import { logoutUserEnhancer } from "../services/actions/user";

import styles from "./profile.module.css";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logoutUserEnhancer() as any);
  };

  const { userData } = useSelector((store: any) => store.user);
  const [values, setValues] = useState<TUser>({
    name: userData ? userData.name : "",
    email: userData ? userData.email : "",
    password: "",
  });

  const [isFormChange, setIsFormChange] = useState(false);

  const handleChange = useCallback((event: { target: { name: string; value: string } }) => {
    setIsFormChange(true);
    setValues((values) => {
      return { ...values, [event.target.name]: event.target.value };
    });
  }, []);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(updateUserEnhancer(values.name, values.email, values.password) as any);
      setIsFormChange(false);
      setValues({ ...values, password: "" });
    },
    [dispatch, values],
  );

  const handleCancel = useCallback(
    async (e: SyntheticEvent) => {
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
              <NavLink to="/profile/orders" className={`text_type_main-medium text_color_inactive pl-2 ${styles.link}`}>
                История заказов
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                end
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
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
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
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
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
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
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