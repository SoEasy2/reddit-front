import React from "react";
import styles from "./Option.module.scss";
import { IData } from "../types";

interface IProps {
  optionHandle(data: IData): void;
  data: IData;
}
const Option: React.FC<IProps> = ({ optionHandle, data }) => {
  return (
    <button className={styles.option} onClick={() => optionHandle(data)}>
      {data.label}
    </button>
  );
};

export { Option };
