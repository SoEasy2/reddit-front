import React, { useState } from "react";
import styles from "./FormAddUser.module.scss";
import cx from "classnames";
import showPass from "../../assets/showPass.svg";
import ButtonAddRecord from "./ButtonAddRecord/ButtonAddRecord";
import { ICreteUserDto } from "../../models/crete-user-dto";
import { Checkbox } from "../Ui-kit/checkbox";
import { EditingConfirmationButton } from "../Ui-kit/editingConfirmationButton";

interface IProps {
  setShow(data: boolean): void;
  setPrompt(data: boolean): void;
  actionModal(data: string): void;
  handleChangeInput(event: any): void;
  user: ICreteUserDto;
}

const FormAddUser: React.FC<IProps> = ({
  actionModal,
  handleChangeInput,
  user,
}) => {
  const [isShowPass, setShowPass] = useState<boolean>(false);
  const onClick = () => {
    actionModal("create");
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.smallFlow}>
          <Checkbox />
        </div>
        <div className={styles.workFlow}>
          <div className={styles.element}>
            <input
              type="text"
              className={cx(
                styles.input,
                styles.login,
                user.login === "" ? styles.error : null
              )}
              name={"login"}
              value={user.login}
              onChange={(e) => handleChangeInput(e)}
            />
          </div>
          <div className={styles.element}>
            <input
              type={isShowPass ? "text" : "password"}
              value={user.password}
              className={cx(
                styles.input,
                styles.password,
                user.password === "" ? styles.error : null
              )}
              name={"password"}
              onChange={(e) => handleChangeInput(e)}
            />
            <img
              src={showPass}
              alt=""
              className={styles.img}
              onClick={() => setShowPass(!isShowPass)}
            />
          </div>
          <div className={styles.element}>
            <input
              type="date"
              name={"subscribeDate"}
              value={user.subscribeDate}
              onChange={(e) => handleChangeInput(e)}
              className={cx(
                styles.input,
                user.subscribeDate !== "" ? null : styles.error
              )}
            />
          </div>
        </div>
        <div className={styles.smallFlow}>
          <Checkbox
            checked={user.banned}
            onChange={handleChangeInput}
            name={"banned"}
          />
        </div>
        <div className={styles.action}>
          <EditingConfirmationButton onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export { FormAddUser };
