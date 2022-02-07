import React from "react";
import styles from "./ButtonSettingUsers.module.scss";
import cx from "classnames";

interface IProps {
  img?: string;
  className?: string;
  handleClick?(data: boolean): void;
}

const ButtonSettingUsers: React.FC<IProps> = ({
  img,
  className,
  handleClick,
  children,
}) => {
  return (
    <button
      className={cx(styles.button, className)}
      onClick={() => (handleClick ? handleClick(true) : null)}
    >
      {img != null ? <img src={img} alt="" /> : children}
    </button>
  );
};

export { ButtonSettingUsers };
