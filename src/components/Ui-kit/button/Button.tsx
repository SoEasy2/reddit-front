import React from "react";
import cx from "classnames";
import styles from "./button.module.scss";
import { Themes } from "../types";

interface Props {
  theme: Themes;
  text?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e?: any) => void;
  name?: string;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  text,
  onClick,
  theme,
  className,
  name,
}: Props) => {
  const getTheme = () => {
    if (theme == Themes.red) {
      return styles.redTheme;
    }
    if (theme == Themes.blue) {
      return styles.blueTheme;
    }
    if (theme == Themes.white) {
      return styles.whiteTheme;
    }
    if (theme == Themes.delete) {
      return styles.delete;
    }
    if (theme == Themes.update) {
      return styles.update;
    }
    if (theme == Themes.create) {
      return styles.create;
    }
    if (theme == Themes.cancel) {
      return styles.cancel;
    }
    return;
  };
  const clickHandler = (e: any) => {
    e.preventDefault();
    onClick ? onClick(e) : null;
  };

  return (
    <button
      className={cx(styles.customButton, getTheme(), className)}
      onClick={clickHandler}
      name={name}
    >
      {text != undefined
        ? text
        : theme == Themes.create
        ? "Добавить"
        : theme == Themes.update
        ? "Cохранить"
        : theme == Themes.delete
        ? "Удалить"
        : theme == Themes.cancel
        ? "Отмена"
        : "Кнопка"}
    </button>
  );
};

export { Button };
