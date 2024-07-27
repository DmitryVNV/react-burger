import React, { useCallback, useEffect, SyntheticEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  resetPasswordEnhancer,
  RESET_PASSWORD_SET_EMAIL,
  setForgotPasswordVisited,
} from "../services/actions/user";

import styles from "./page.module.css";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetPasswordEmail } = useSelector((store: any) => store.user);

  const resetPassword = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      if (resetPasswordEmail.length) dispatch(resetPasswordEnhancer(resetPasswordEmail) as any);
      navigate("/reset-password");
    },
    [dispatch, resetPasswordEmail],
  );

  const setEmail = useCallback(
    (e: { target: { value: string } }) => {
      dispatch({
        type: RESET_PASSWORD_SET_EMAIL,
        email: e.target.value,
      });
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(setForgotPasswordVisited());
  }, [dispatch]);

  return (
    <form className={styles.main} onSubmit={resetPassword}>
      <section className={styles.container}>
        <h1 className="text_type_main-medium mb-6">Восстановление пароля</h1>
        <div className="mb-6">
          <Input
            type={"email"}
            placeholder={"Укажите e-mail"}
            name={"E-mail"}
            size={"default"}
            value={resetPasswordEmail || ""}
            onChange={setEmail}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          />
        </div>

        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>

        <p className="text text_type_main-default text_color_inactive mt-20">
          <span>Вспомнили пароль? </span>
          <Link className={`text text_type_main-default ${styles.link}`} to="/login">
            Войти
          </Link>
        </p>
      </section>
    </form>
  );
};

export default ForgotPasswordPage;