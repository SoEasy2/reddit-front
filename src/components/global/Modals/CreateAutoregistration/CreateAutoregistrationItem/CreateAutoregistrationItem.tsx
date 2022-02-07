import React from "react";
import styles from "./CreateAutoregistrationItem.module.scss";
import { Checkbox } from "../../../../Ui-kit/checkbox";
interface IProps {
  temp?: any;
}
const CreateAutoregistrationItem: React.FC<IProps> = () => {
  return (
    <div className={styles.wrapper}>
      <Checkbox />
      <p className={styles.login}>Login</p>
    </div>
  );
};

export { CreateAutoregistrationItem };
