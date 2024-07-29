import React, { useState, ChangeEvent, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { registerUserEnhancer } from "../services/actions/user";
import { loginUserEnhancer } from "../services/actions/user";
import { TUser } from "../utils/types";
import styles from "./page.module.css";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState<TUser>({
    name: "",
    email: "",
    password: "",
  });

  const { registerUserFailed } = useSelector((state: any) => state.user);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((values) => {
      return { ...values, [event.target.name]: event.target.value };
    });
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUserEnhancer(values.email, values.password, values.name) as any);
    dispatch(loginUserEnhancer(values.email, values.password) as any);
  };

  return (
    <form className={styles.main} onSubmit={onSubmit}>
      <section className={styles.container}>
        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
        <div className={styles.input}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            name={"name"}
            size={"default"}
            onChange={handleChange}
            value={values.name || ""}
			onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          />
        </div>
        <div className={`${styles.input} mb-6 mt-6`}>
          <Input
            type={"email"}
            placeholder={"E-mail"}
            name={"email"}
            size={"default"}
            onChange={handleChange}
            value={values.email || ""}
			onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          />
        </div>

        <PasswordInput
          placeholder={"Пароль"}
          name={"password"}
          onChange={handleChange}
          value={values.password || ""}
        />

        <div className="mt-6 mb-20">
          <Button htmlType="submit" type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </div>
        <span
          className={`${styles.error} text text_type_main-default mb-6 mt-6`}
          style={{ visibility: registerUserFailed ? "visible" : "hidden" }}
        >
          Ошибка при регистрации. Некорректный набор полей или пользователь уже зарегистрирован.
        </span>
        <section className={styles.questions}>
          <p className="text text_type_main-default text_color_inactive">
            <span>Уже зарегистрированы? </span>
            <Link className={`text text_type_main-default ${styles.link}`} to="/login">
              Войти
            </Link>
          </p>
        </section>
      </section>
    </form>
  );
};

export default RegisterPage;