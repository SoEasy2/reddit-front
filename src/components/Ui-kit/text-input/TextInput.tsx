import React, { FocusEventHandler } from "react";
import styles from "./textInput.module.scss";
import cx from "classnames";

interface Props {
  placeholder?: string;
  name?: string;
  id?: string;
  value?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const TextInput: React.FC<Props> = ({
  placeholder,
  name,
  id,
  value,
  onChange,
  onBlur,
  className,
}) => {
  return (
    <>
      <input
        type="text"
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
        className={cx(styles.textInput, className)}
      />
    </>
  );
};

export { TextInput };
