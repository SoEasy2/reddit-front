import React from "react";
import { IData } from "../types";
import styles from "./Option.module.scss";

interface IProps {
  handleClick(value: IData): void;
  data: IData;
}
const Option: React.FC<IProps> = ({ data, handleClick }) => {
  return (
    <button className={styles.option} onClick={() => handleClick(data)}>
      {data.label}
    </button>
  );
};

export { Option };
