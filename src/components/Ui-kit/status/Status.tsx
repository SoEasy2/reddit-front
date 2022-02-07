import React from "react";
import cx from "classnames";
import styles from "./status.module.scss";
import { StatusType } from "../../../redux/sessions/types";

interface Props {
  className?: string;
  status: StatusType;
  text?: string;
}

const Status: React.FC<Props> = ({ className, status, text }) => {
  return (
    <div
      className={cx(
        styles.status,
        status === StatusType.Work
          ? styles.working
          : status === StatusType.Init
          ? styles.notWorking
          : status === StatusType.Wait
          ? styles.waiting
          : status === StatusType.Complete
          ? styles.ended
          : status === StatusType.Error
          ? styles.error
          : null,
        className
      )}
    >
      {text != undefined
        ? text
        : status === StatusType.Work
        ? "Работают"
        : status === StatusType.Init
        ? "Не работают"
        : status === StatusType.Wait
        ? "Ожидание"
        : status === StatusType.Complete
        ? "Окончены"
        : status === StatusType.Error
        ? "Ошибка"
        : null}
    </div>
  );
};

export { Status };
