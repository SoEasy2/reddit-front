import React from "react";
import cx from "classnames";
import styles from "./pauseButton.module.scss";
import { ReactComponent as PauseCircle } from "../../../assets/button-pause-circle.svg";

interface Props {
  isActive: boolean;
  className?: string;
  onClick?: ((e: React.SyntheticEvent) => void) | (() => void);
}

const PauseButton: React.FC<Props> = ({ isActive, className, onClick }) => {
  return (
    <div
      className={
        isActive
          ? cx(styles.pauseButton, styles.isRowSelected, className)
          : cx(styles.pauseButton, className)
      }
      onClick={onClick}
    >
      <PauseCircle className={cx(styles.circleInPauseButton)} />
    </div>
  );
};

export { PauseButton };
