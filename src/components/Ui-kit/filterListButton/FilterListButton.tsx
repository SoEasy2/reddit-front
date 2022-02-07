import React, { SyntheticEvent } from "react";
import cx from "classnames";
import styles from "./filterListButton.module.scss";

interface Props {
  className?: string;
  onClick?: ((e: SyntheticEvent) => void) | (() => void);
}

const FilterListButton: React.FC<Props> = ({ className, onClick }) => {
  return (
    <div className={cx(styles.filterListButton, className)} onClick={onClick}>
      <span className={styles.topLine}></span>
      <span className={styles.middleLine}></span>
      <span className={styles.bottomLine}></span>
    </div>
  );
};

export { FilterListButton };
