import React from "react";
import cx from "classnames";
import styles from "./finalStatusBlock.module.scss";
import { ReactComponent as GreenCheckmark } from "../../../assets/greenCheckmark.svg";
import { ReactComponent as RedCross } from "../../../assets/redCross.svg";
import { ReactComponent as Loading } from "../../../assets/loading.svg";
type Props = {
  className?: string;
  finalStatus: "Success" | "Fail" | "WaitForWork";
  hoverText?: string;
};

const FinalStatusBlock: React.FC<Props> = ({
  finalStatus,
  hoverText,
  className,
}) => {
  return (
    <div
      className={cx(
        styles.finalStatusBlock,
        finalStatus == "Success"
          ? styles.successStatusBlock
          : finalStatus == "Fail"
          ? styles.failStatusBlock
          : styles.waitForWorkStatusBlock
      )}
    >
      {finalStatus == "Success" ? (
        <GreenCheckmark />
      ) : finalStatus == "Fail" ? (
        <RedCross />
      ) : (
        <Loading />
      )}
      <div className={cx(styles.text, className)}>
        {finalStatus == "Success"
          ? "Успешно"
          : finalStatus == "Fail"
          ? "Ошибка"
          : "Ожидание"}
      </div>
    </div>
  );
};

export { FinalStatusBlock };
