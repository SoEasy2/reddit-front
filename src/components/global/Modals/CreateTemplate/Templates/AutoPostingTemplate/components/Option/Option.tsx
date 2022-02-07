import React from "react";
import styles from "./Option.module.scss";

interface IProps {
  text: string;
  isCreate: boolean;
  onClickCreate?(data: boolean): void;
  setActive(data: boolean): void;
}

const Option: React.FC<IProps> = ({
  text,
  isCreate,
  onClickCreate,
  setActive,
}) => {
  const handleClickCreate = () => {
    setActive(false);
    onClickCreate ? onClickCreate(true) : null;
  };
  return (
    <button
      className={isCreate ? styles.create : styles.button}
      onClick={() => (onClickCreate ? handleClickCreate() : null)}
    >
      {text}
    </button>
  );
};

export { Option };
