import React, { ReactNode } from "react";
import cx from "classnames";
import styles from "./checkbox.module.scss";

interface Props {
  id?: string;
  name?: string;
  className?: string;
  label?: string | ReactNode;
  disabled?: boolean;
  hasForm?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  checked?: boolean;
}

const Checkbox = ({
  id,
  name,
  className,
  label,
  disabled,
  onClick,
  onChange,
  checked,
}: Props) => {
  const inputValue = React.useRef<HTMLInputElement>(null);
  return (
    <div className={cx(styles.checkboxContainer, className)} onClick={onClick}>
      <input
        type="checkbox"
        className={cx(styles.customCheckbox)}
        id={id}
        ref={inputValue}
        name={name}
        onChange={onChange}
        checked={checked}
      />
      <label className={styles.customLabel} htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

export { Checkbox };
