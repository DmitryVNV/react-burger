import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { setNewPasswordEnhancer } from "../services/actions/user";

import styles from "./page.module.css";

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const handleChange = (event) => {
    setValues((values) => {
      return { ...values, [event.target.name]: event.target.value };
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(setNewPasswordEnhancer(values.newPassword, values.token));
	navigate("/login");
  };

  return (
    <form className={styles.main} onSubmit={onSubmit}>
      <section className={styles.container}>
        <h1 className="text_type_main-medium mb-6">Восстановление пароля</h1>

        <PasswordInput
          placeholder={"Введите новый пароль"}
          name={"newPassword"}
          onChange={handleChange}
          value={values.newPassword || ""}
        />

        <div className="mb-6 mt-6">
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            name={"token"}
            size={"default"}
            onChange={handleChange}
            value={values.token || ""}
          />
        </div>

        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>

        <p className="text text_type_main-default text_color_inactive mt-20">
          <span>Вспомнили пароль? </span>
          <Link className={`text text_type_main-default ${styles.link}`} to="/login">Войти</Link>
        </p>
      </section>
    </form>
  );
};

export default ResetPasswordPage;