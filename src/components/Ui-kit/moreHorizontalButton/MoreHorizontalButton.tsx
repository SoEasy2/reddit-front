import React, { ReactNode, SyntheticEvent } from "react";
import cx from "classnames";
import styles from "./moreHorizontalButton.module.scss";
import { ReactComponent as MoreHorizontalDots } from "../../../assets/moreHorizontalDots.svg";

interface Props {
  className?: string;
  onClick?: ((e: SyntheticEvent) => void) | (() => void);
}

const MoreHorizontalButton: React.FC<Props> = ({ className, onClick }) => {
  return (
    <div
      className={cx(styles.moreHorizontalButton, className)}
      onClick={onClick}
    >
      <MoreHorizontalDots className={styles.moreHorizontalDots} />
    </div>
  );
};

export { MoreHorizontalButton };
