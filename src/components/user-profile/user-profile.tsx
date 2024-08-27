import { memo, useState, useCallback, SyntheticEvent, FormEvent } from "react";
import { useSelector, useDispatch } from "../../services/hooks";
import { updateUserEnhancer } from "../../services/actions/user";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { TUser } from "../../services/types";

import styles from "./user-profile.module.css";

const UserProfile = () => {
  const dispatch = useDispatch();

  const { userData } = useSelector((store) => store.user);
  const [values, setValues] = useState<TUser>({
    name: userData ? userData.name : "",
    email: userData ? userData.email : "",
    password: "",
  });

  const [isFormChange, setIsFormChange] = useState<boolean>(false);

  const handleChange = useCallback((event: { target: { name: string; value: string } }) => {
    setIsFormChange(true);
    setValues((values) => {
      return { ...values, [event.target.name]: event.target.value };
    });
  }, []);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(updateUserEnhancer(values.name, values.email, values.password));
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
  );
};

export default memo(UserProfile);