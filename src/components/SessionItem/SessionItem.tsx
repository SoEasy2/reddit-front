import React from "react";
import styles from "./SessionItem.module.scss";
import { Checkbox } from "../Ui-kit/checkbox";
import { Status } from "../Ui-kit/status";
import { format } from "date-fns";
import { MoreHorizontalButton } from "../Ui-kit/moreHorizontalButton";
import { SessionsType, StatusType } from "../../redux/sessions/types";

interface Props extends SessionsType {
  onChangeItem: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

const SessionItem: React.FC<Props> = ({
  sessionId,
  status,
  login,
  dataStart,
  dataEnd,
  presetName,
  textResult,
  onChangeItem,
}) => {
  const NOW_DATE_FORMAT = "yyyy.MM.dd";
  const NOW_TIME_FORMAT = "HH:mm";

  const START_DATE = format(new Date(dataStart).getDate(), NOW_DATE_FORMAT);
  const START_TIME = format(new Date(dataStart).getTime(), NOW_TIME_FORMAT);

  const END_DATE = format(new Date(dataEnd).getDate(), NOW_DATE_FORMAT);
  const END_TIME = format(new Date(dataEnd), NOW_TIME_FORMAT);

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.select}>
          <Checkbox id={sessionId} name={sessionId} onChange={onChangeItem} />
        </div>
        <div className={styles.status}>
          <Status status={status} />
        </div>
        <div className={styles.login}>
          <p>{login}</p>
        </div>
        <div className={styles.template}>
          <p>{presetName}</p>
        </div>
        <div className={styles.startDate}>
          <p>{`${START_DATE}, в ${START_TIME}`}</p>
        </div>
        <div className={styles.endDate}>
          <p>{`${END_DATE}, в ${END_TIME}`}</p>
        </div>
        <div className={styles.action}>
          <MoreHorizontalButton className={styles.actionModal} />
        </div>
      </div>
    </div>
  );
};

export { SessionItem };
