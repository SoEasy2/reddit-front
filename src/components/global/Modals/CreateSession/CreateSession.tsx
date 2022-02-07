import React, { useState } from "react";
import styles from "./CreateSession.module.scss";
import { ModalClosingButton } from "../../../Ui-kit/modalClosingButton";
import { Select } from "./components/Select";
import { Checkbox } from "../../../Ui-kit/checkbox";
import { UserItem } from "./components/UserItem";
import { Overflow } from "../../../../containers/Overflow";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { RootState } from "../../../../redux/store";
import { IData } from "../../Select/types";
import { Button } from "../../../Ui-kit/button";
import { Themes } from "../../../Ui-kit/types";
import { useCheckboxesHandler } from "../../../../hooks/useCheckboxesHandler";
import { addSession } from "../../../../redux/sessions/SessionsSlice";
import { IPreset } from "../../../../redux/preset/dto/Template/preset";

interface IProps {
  onClose(data: boolean): void;
}

const CreateSession: React.FC<IProps> = ({ onClose }) => {
  const handleClose = () => {
    onClose(false);
  };

  const [itemPreset, setItemPreset] = useState<any>();
  const [itemPresetType, setItemPresetType] = useState<IData>();
  const dispatch = useAppDispatch();
  const usersCheckboxes = useCheckboxesHandler();

  const users = useAppSelector(
    (state: RootState) => state.sessionsReducer.users
  );

  const presets = useAppSelector(
    (state: RootState) => state.sessionsReducer.presets
  );

  const onAddSessionHandler = () => {
    dispatch(
      addSession({
        presetId: Number(itemPreset),
        profileId: usersCheckboxes.inputChecked,
      })
    );
  };

  return (
    <div className={styles.modal} onClick={() => onClose(false)}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.wrapper}>
          <div className={styles.head}>
            <h4 className={styles.title}>Добавление сессии</h4>
            <ModalClosingButton onClick={handleClose} />
          </div>
        </div>
        <div className={styles.hr}></div>
        <div className={styles.wrapper}>
          <div className={styles.contentParts}>
            <input type="text" placeholder="Поиск" className={styles.search} />
            <Select
              placeholder={"Shablon"}
              className={styles.select}
              data={presets.map((preset) => ({
                label: preset.name,
                value: preset.id,
              }))}
              setItemPerPage={setItemPreset}
            />
            <Select
              placeholder={"Type"}
              className={styles.select}
              data={Object.values(IPreset).map((type) => ({
                label: type,
                value: type,
              }))}
              setItemPerPage={setItemPresetType}
            />
            {/*{console.log(usersChecked)}*/}
            <div className={styles.users}>
              <div className={styles.headUsers}>
                <Checkbox className={styles.checkBox} />
                <p className={styles.login}>Логин пользователя</p>
              </div>
              <Overflow className={styles.overflow}>
                {users.map(({ login, profileId }) => (
                  <UserItem
                    login={login}
                    profileId={profileId}
                    onChangeUserItem={usersCheckboxes.itemCheckedHandler}
                  />
                ))}
              </Overflow>
            </div>
            <div className={styles.wrapperButton}>
              <Button
                theme={Themes.red}
                onClick={onAddSessionHandler}
                text="Добавить"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CreateSession };
