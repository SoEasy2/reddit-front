import React, { useState } from "react";
import styles from "./AutoRegistrationItem.module.scss";
import { Checkbox } from "../Ui-kit/checkbox";
import { Status } from "../Ui-kit/status";
import { FinalStatusBlock } from "../Ui-kit/finalStatusBlock";
import { ReactComponent as Prompt } from "../../assets/prompt.svg";
import { MoreHorizontalButton } from "../Ui-kit/moreHorizontalButton";
import { PromptText } from "../global/Modals/PropmtText";
import { ActionRecord } from "../global/Modals/ActionRecord";
import { StatusType } from "../../redux/sessions/types";

const AutoRegistrationItem: React.FC = () => {
  const [isPrompt, setPrompt] = useState<boolean>(false);
  const [isAction, setAction] = useState<boolean>(false);
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.selectFlow}>
          <Checkbox checked={true} />
        </div>
        <div className={styles.status}>
          <Status status={StatusType.Init} className={styles.buttonStatus} />
          <Prompt
            className={styles.prompt}
            onMouseMove={() => setPrompt(true)}
            onMouseLeave={() => setPrompt(false)}
          />
          {isPrompt ? (
            <PromptText text={""} className={styles.promptText} />
          ) : null}
        </div>
        <div className={styles.loginFlow}>
          <p className={styles.text}>Kamalet231123</p>
        </div>
        <div className={styles.startDateFlow}>
          <p className={styles.text}>18.12.2021, в 12:33</p>
        </div>
        <div className={styles.endDateFlow}>
          <p className={styles.text}>31.12.2021, в 00:00</p>
        </div>
        <div className={styles.totalFlow}>
          <FinalStatusBlock finalStatus={"Success"} />
        </div>
        <div className={styles.actionFlow}>
          <MoreHorizontalButton
            onClick={() => setAction(!isAction)}
            className={isAction ? styles.actionModalActive : ""}
          />
          {isAction ? (
            <ActionRecord
              onClickChange={() => console.log(true)}
              setActionShow={setAction}
              isDelete={false}
              className={styles.actionModal}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export { AutoRegistrationItem };
