import React from "react";
import cx from "classnames";
import styles from "./Overflow.module.scss";

interface IProps {
  className?: string;
}
const Overflow: React.FC<IProps> = ({ children, className }) => {
  return <div className={cx(styles.overflow, className)}>{children}</div>;
};

export { Overflow };
