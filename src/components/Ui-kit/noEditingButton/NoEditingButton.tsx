import React, { ReactNode, SyntheticEvent } from "react";
import cx from "classnames";
import styles from "./noEditingButton.module.scss";

interface Props {
  className?: string;
  onClick?: ((e: SyntheticEvent) => void) | (() => void);
}

const NoEditingButton: React.FC<Props> = ({ className, onClick }) => {
  return (
    <div className={cx(styles.noEditingButton, className)} onClick={onClick}>
      <span className={styles.firstDot}></span>
      <span className={styles.secondDot}></span>
      <span className={styles.thirdDot}></span>
    </div>
  );
};

export { NoEditingButton };
