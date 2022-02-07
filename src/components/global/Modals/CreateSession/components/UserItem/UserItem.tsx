import React from "react";
import { Checkbox } from "../../../../../Ui-kit/checkbox";
import styles from "./UserItem.module.scss";
import { sessionUsersDto } from "../../../../../../redux/sessions/types/session-users-dto";

interface Props extends sessionUsersDto {
  onChangeUserItem: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserItem: React.FC<Props> = ({ login, profileId, onChangeUserItem }) => {
  return (
    <div className={styles.item}>
      <Checkbox
        className={styles.checkBox}
        onChange={onChangeUserItem}
        id={profileId}
        name={profileId}
      />
      <p className={styles.login}>{login}</p>
    </div>
  );
};

export { UserItem };
