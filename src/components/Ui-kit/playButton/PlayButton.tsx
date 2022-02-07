import React from "react";
import cx from "classnames";
import styles from "./playButton.module.scss";
import { ReactComponent as PlayCircle } from "../../../assets/button-play-circle.svg";

interface Props {
  isActive: boolean;
  className?: string;
  onClick?: ((e: React.SyntheticEvent) => void) | (() => void);
}

const PlayButton: React.FC<Props> = ({ className, isActive, onClick }) => {
  return (
    <div
      className={
        isActive
          ? cx(styles.playButton, styles.isRowSelected, className)
          : cx(styles.playButton, className)
      }
      onClick={onClick}
    >
      <PlayCircle className={cx(styles.circleInPlayButton)} />
    </div>
  );
};

export { PlayButton };
