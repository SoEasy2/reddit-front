import React, { useState } from "react";
import styles from "./authPage.module.scss";
import { Logo } from "../../components/logo";
import { Checkbox } from "../../components/Ui-kit/checkbox";
import { TextInput } from "../../components/Ui-kit/text-input";
import { Button } from "../../components/Ui-kit/button";
import { ReactComponent as TelegramIcon } from "../../assets/telegram-icon.svg";
import { Themes } from "../../components/Ui-kit/types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RootState } from "../../redux/store";
import { getToken } from "../../redux/auth/AuthSlice";
import { useInput } from "../../hooks/useInput";

const AuthPage: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    (state: RootState) => state.authReducer.isLoading
  );

  const getTokenHandler = () => {
    dispatch(
      getToken({
        login: login.value,
        password: password.value,
      })
    );
  };

  const login = useInput("", { isEmpty: true });
  const password = useInput("", { isEmpty: true });

  const checkboxHandler = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className={styles.background}>
      <div className={styles.auth}>
        <Logo />
        <form action="">
          {login.isDirty && login.isEmpty && (
            <label className={styles.error}>Поле не может быть пустым</label>
          )}
          <TextInput
            value={login.value}
            onChange={login.onChange}
            placeholder="Введите логин"
            onBlur={login.onBlur}
          />

          {password.isDirty && password.isEmpty && (
            <label className={styles.error}>Поле не может быть пустым</label>
          )}
          <TextInput
            value={password.value}
            onChange={password.onChange}
            placeholder="Введите пароль"
            onBlur={password.onBlur}
          />
          <Checkbox
            checked={isChecked}
            className={styles.checkbox}
            onClick={checkboxHandler}
            label="Запомнить меня"
          />
          <Button
            theme={Themes.red}
            onClick={getTokenHandler}
            className={styles.authBtn}
            disabled={!login.inputValid || !password.inputValid}
            text="Войти"
          />

          {isLoading && <div>ЗАГРУЖАЕТСЯ...</div>}
        </form>

        <div className={styles.supportLiable}>
          <h2>Поддержка</h2>
          <TelegramIcon />
        </div>
      </div>
    </div>
  );
};

export { AuthPage };
