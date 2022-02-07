import React from "react";
import cx from "classnames";
import styles from "./alert.module.scss";
import { ReactComponent as ExclamationMark } from "../../../../src/assets/exclamationMark.svg";
import { ReactComponent as Checkmark } from "../../../../src/assets/checkmark.svg";
import { ReactComponent as Cross } from "../../../../src/assets/whiteCross.svg";

interface Props {
  type: "success" | "error" | "cancel" | "";
  className?: string;
  text?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}

const Alert: React.FC<Props> = ({ text, type, className, onClick }) => {
  return (
    <div
      className={cx(
        styles.alertComponent,
        type == "success"
          ? styles.success
          : type == "error"
          ? styles.error
          : null,
        className
      )}
    >
      <div className={styles.svgContainer}>
        {type == "success" ? <ExclamationMark /> : <Checkmark />}
      </div>
      <div className={cx(styles.text)}>
        {text != undefined
          ? text
          : type == "success"
          ? "Запись успешно добавлена"
          : type == "error"
          ? "Введите корректные данные"
          : null}
      </div>
      <div className={styles.crossContainer} onClick={onClick}>
        <Cross />
      </div>
    </div>
  );
};

export { Alert };
