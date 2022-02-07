import React, { ReactNode, SyntheticEvent } from "react";
import cx from "classnames";
import styles from "./editingConfirmationButton.module.scss";

interface Props {
  className?: string;
  onClick?: ((e: SyntheticEvent) => void) | (() => void);
}

const EditingConfirmationButton: React.FC<Props> = ({ className, onClick }) => {
  return (
    <div
      className={cx(styles.editingConfirmationButton, className)}
      onClick={onClick}
    >
      <span className={styles.leftPartOfCheckmark}></span>
      <span className={styles.rightPartOfCheckmark}></span>
    </div>
  );
};

export { EditingConfirmationButton };
