import React, { ReactNode } from "react";
import cx from "classnames";
import styles from "./modalClosingButton.module.scss";

interface Props {
  className?: string;
  onClick?: () => void;
}

const ModalClosingButton: React.FC<Props> = ({ className, onClick }) => {
  return (
    <div className={cx(styles.customButton, className)} onClick={onClick}>
      <span className={styles.firstSpan}></span>
      <span className={styles.secondSpan}></span>
    </div>
  );
};

export { ModalClosingButton };
