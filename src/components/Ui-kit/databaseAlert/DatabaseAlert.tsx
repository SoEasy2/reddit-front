import React, { SyntheticEvent } from "react";
import cx from "classnames";
import styles from "./databaseAlert.module.scss";
import { Themes } from "../types";
import { Button } from "../button";

interface Props {
  className?: string;
  onClick?(e: any): void;
  type: string;
  headerText?: string;
  contentText?: string;
}

const DatabaseAlert: React.FC<Props> = ({
  className,
  onClick,
  type,
  headerText,
  contentText,
}) => {
  const [hideDatabaseAlert, setHideDatabaseAlert] = React.useState(true);
  return (
    <div className={className}>
      <div
        className={
          hideDatabaseAlert == false
            ? styles.hiddenDatabaseAlert
            : cx(styles.databaseAlert)
        }
      >
        <div className={styles.header}>
          {headerText != undefined
            ? headerText
            : type == "delete"
            ? "Удаление записи"
            : type == "update"
            ? "Cохранение изменений"
            : type == "create"
            ? "Добавление записи"
            : null}
        </div>
        <div className={styles.content}>
          <div className={styles.contentText}>
            {contentText != undefined
              ? contentText
              : type == "delete"
              ? "Вы действительно хотите удалить данную запись?"
              : type == "update"
              ? "Сохранить внесённые изменения данных?"
              : type == "create"
              ? "Добавить запись в введёнными данными?"
              : null}
          </div>
          <div className={styles.buttons}>
            <Button
              theme={Themes.cancel}
              onClick={(e) => (onClick ? onClick(e) : null)}
              name={"cancel"}
            />
            {type == "delete" ? (
              <Button theme={Themes.delete} name={"delete"} onClick={onClick} />
            ) : type == "update" ? (
              <Button theme={Themes.update} name={"update"} onClick={onClick} />
            ) : type == "create" ? (
              <Button theme={Themes.create} name={"create"} onClick={onClick} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export { DatabaseAlert };
