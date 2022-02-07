import React from "react";
import styles from "./ButtonAdd.module.scss";
import cx from "classnames";

interface IProps {
  className?: string;
  onClick(data: boolean): void;
}
const ButtonAdd: React.FC<IProps> = ({ children, className, onClick }) => {
  return (
    <button
      className={cx(styles.button, className)}
      onClick={() => onClick(true)}
    >
      {children}
    </button>
  );
};

export { ButtonAdd };
