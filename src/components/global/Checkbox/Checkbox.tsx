import React, { useEffect, useState } from "react";
import styles from "./Checkbox.module.scss";
import cx from "classnames";

interface IProps {
  className?: string;
  value: boolean;
  disabled?: boolean;
  name: string;
  onChange?(event: any): void;
}
const Checkbox: React.FC<IProps> = ({
  className,
  disabled,
  value,
  onChange,
  name,
}) => {
  return (
    <label className={cx(styles.container, className)}>
      <input
        type="checkbox"
        className={`${styles.checkbox}`}
        checked={value}
        disabled={false}
        onChange={onChange}
        name={name}
      />
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default Checkbox;
