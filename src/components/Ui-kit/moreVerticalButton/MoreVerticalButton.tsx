import React, { ReactNode, SyntheticEvent } from "react";
import cx from "classnames";
import styles from "./moreVerticalButton.module.scss";

interface Props {
  className?: string;
  onClick?: ((e: SyntheticEvent) => void) | (() => void);
}

const MoreVerticalButton: React.FC<Props> = ({ className, onClick }) => {
  return (
    <div className={cx(styles.moreVerticalButton, className)} onClick={onClick}>
      <span className={styles.topDot}></span>
      <span className={styles.middleDot}></span>
      <span className={styles.bottomDot}></span>
    </div>
  );
};

export { MoreVerticalButton };
