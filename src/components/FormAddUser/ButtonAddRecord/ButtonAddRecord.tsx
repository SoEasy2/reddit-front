import React from "react";
import { ReactComponent as Checked } from "../../../assets/checked.svg";
import styles from "./ButtonAddRecord.module.scss";
import cx from "classnames";
interface IProps {
  className?: string;
  onClick(): void;
}

const ButtonAddRecord: React.FC<IProps> = ({ className, onClick }) => {
  return (
    <button className={cx(styles.button, className)} onClick={() => onClick()}>
      <Checked className={styles.img} />
    </button>
  );
};

export default ButtonAddRecord;
