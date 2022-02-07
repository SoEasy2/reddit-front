import React from "react";
import styles from "./CreateAutoregistration.module.scss";
import { ModalClosingButton } from "../../../Ui-kit/modalClosingButton";
import { Overflow } from "../../../../containers/Overflow";
import { ButtonAdd } from "../../ButtonAdd/ButtonAdd";
import { Checkbox } from "../../../Ui-kit/checkbox";
import { CreateAutoregistrationItem } from "./CreateAutoregistrationItem";
interface IProps {
  setSnow(data: boolean): void;
}
const CreateAutoregistration: React.FC<IProps> = ({ setSnow }) => {
  const click = (data: boolean) => {
    console.log(data);
  };
  return (
    <div className={styles.modal} onClick={() => setSnow(false)}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.wrapper}>
          <div className={styles.head}>
            <h4 className={styles.title}>Добавление авторегистрации</h4>
            <ModalClosingButton />
          </div>
          <div className={styles.wrapperInput}>
            <input type="text" className={styles.input} placeholder={"Поиск"} />
          </div>
          <div className={styles.wrapperHead}>
            <Checkbox />
            <p className={styles.text}>Логин почты</p>
          </div>
          <Overflow className={styles.overflow}>
            <CreateAutoregistrationItem />
          </Overflow>
          <div className={styles.buttonWrapper}>
            <ButtonAdd onClick={click}>Добавить</ButtonAdd>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CreateAutoregistration };
