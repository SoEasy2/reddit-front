import React, { useEffect, useState } from "react";
import showPass from "../../assets/showPass.svg";
import calendar from "../../assets/calendar.svg";
import styles from "./UserItem.module.scss";
import Checkbox from "../global/Checkbox/Checkbox";
import { PromptText } from "../global/Modals/PropmtText";
import cx from "classnames";
import { ReactComponent as Settings } from "../../assets/settings.svg";
import { IUser } from "../../redux/users/types";
import ButtonAddRecord from "../FormAddUser/ButtonAddRecord/ButtonAddRecord";
import { ActionRecord } from "../global/Modals/ActionRecord";

interface IProps {
  className?: string;
  onCheckbox?(state: boolean): void;
  checked: boolean;
  data: IUser;
  setFocusUser(user: IUser): void;
  handleModal(data: string): void;
}
interface IPrompt {
  isPrompt: boolean;
  text: string | null;
}
const UserItem: React.FC<IProps> = ({
  checked,
  data,
  setFocusUser,
  handleModal,
}) => {
  const [isShowPass, setShowPass] = useState(false);
  const [user, setUser] = useState<IUser>({ ...data });
  const [actionShow, setActionShow] = useState<boolean>(false);
  const [isChange, setChange] = useState<boolean>(false);
  const handleClick = (event: any) => {
    event.stopPropagation();
    setActionShow(!actionShow);
  };
  const [prompt, setPrompt] = useState<IPrompt>({
    isPrompt: false,
    text: null,
  });
  useEffect(() => {
    (() => {
      if (user.login.split("").length > 14)
        setPrompt({ text: user.login, isPrompt: false });
    })();
  }, []);
  const handleMove = () => {
    setPrompt((prev) => ({ ...prev, isPrompt: true }));
  };
  const handleLeave = () => {
    setPrompt((prev) => ({ ...prev, isPrompt: false }));
  };
  const handleInputChange = (event: any) => {
    setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const handleChange = () => {
    setFocusUser(user);
    setChange(false);
    handleModal("update");
  };
  const handleDelete = () => {
    setFocusUser(user);
    handleModal("delete");
  };
  const handleGetMonth = (obj: Date) => {
    const date =
      ("0" + obj.getDate()).slice(-2) +
      "." +
      ("0" + (obj.getMonth() + 1)).slice(-2) +
      "." +
      obj.getFullYear();
    return date;
  };
  return (
    <div>
      <div className={styles.wrapper} onClick={() => setActionShow(false)}>
        <div className={styles.smallFlow}>
          <Checkbox className={styles.checkbox} name={"select"} value={false} />
        </div>
        <div className={styles.workFlow}>
          <div
            className={styles.element}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
          >
            <input
              type="text"
              className={
                isChange
                  ? cx(
                      styles.input,
                      styles.login,
                      styles.inputChanged,
                      user.login === "" ? styles.error : null
                    )
                  : cx(styles.input, styles.login)
              }
              name={"login"}
              value={user.login.split("").slice(0, 14).join("")}
              disabled={isChange ? false : true}
              onChange={handleInputChange}
            />
            {prompt.isPrompt && prompt.text != null && !isChange ? (
              <PromptText text={user.login} className={styles.prompt} />
            ) : null}
          </div>
          <div className={styles.element}>
            <input
              type={isShowPass ? "text" : "password"}
              value={user.password}
              disabled={isChange ? false : true}
              className={
                isChange
                  ? cx(
                      styles.input,
                      styles.password,
                      styles.inputChanged,
                      user.password === "" ? styles.error : null
                    )
                  : cx(styles.input, styles.password)
              }
              onChange={handleInputChange}
              name={"password"}
            />
            <img
              src={showPass}
              alt=""
              className={styles.img}
              onClick={() => setShowPass(!isShowPass)}
            />
          </div>
          <div className={styles.element}>
            {isChange ? (
              <input
                type={"date"}
                name={"subscribeDate"}
                onChange={handleInputChange}
                className={cx(
                  styles.input,
                  user.subscribeDate == "" ? styles.error : null
                )}
              />
            ) : (
              <>
                <p>{handleGetMonth(new Date(data.subscribeDate))}</p>
                <img src={calendar} alt="" className={styles.img} />
              </>
            )}
          </div>
        </div>
        <div className={styles.smallFlow}>
          <Checkbox
            className={styles.checkbox}
            disabled={isChange ? !isChange : isChange}
            name={"banned"}
            value={user.banned}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.settings}>
          <div className={styles.element}>
            {isChange ? (
              <ButtonAddRecord onClick={handleChange} />
            ) : (
              <button
                className={
                  actionShow
                    ? cx(styles.buttonSettings, styles.buttonSettingsActive)
                    : styles.buttonSettings
                }
                onClick={(e) => handleClick(e)}
              >
                <Settings
                  className={actionShow ? styles.activeImg : styles.settingsImg}
                />
              </button>
            )}
          </div>
          {actionShow ? (
            <ActionRecord
              setActionShow={setActionShow}
              onClickChange={setChange}
              handleDelete={handleDelete}
              isDelete={true}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export { UserItem };
