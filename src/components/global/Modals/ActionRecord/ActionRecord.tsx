import React, { useState } from "react";
import styles from "./ActionRecord.module.scss";
import { ReactComponent as Delete } from "../../../../assets/delete.svg";
import { ReactComponent as Edit } from "../../../../assets/edit.svg";
import cx from "classnames";

interface IProps {
  className?: string;
  onClickChange(data: boolean): void;
  setActionShow(data: boolean): void;
  handleDelete?(): void;
  isDelete: boolean;
}
const ActionRecord: React.FC<IProps> = ({
  className,
  onClickChange,
  setActionShow,
  handleDelete,
  isDelete,
}) => {
  const handleClickChange = () => {
    onClickChange(true);
    setActionShow(false);
  };
  return (
    <div
      className={cx(styles.modal, className)}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.arrowUp}></div>
      <div className={styles.wrapper}>
        <button
          className={cx(styles.button, styles.edit)}
          name={"edit"}
          onClick={handleClickChange}
        >
          <Edit className={styles.img} />
          Change
        </button>
        {isDelete ? (
          <button
            className={cx(styles.button, styles.delete)}
            name={"delete"}
            onClick={() => (handleDelete ? handleDelete() : null)}
          >
            <Delete className={styles.img} />
            Delete
          </button>
        ) : null}
      </div>
    </div>
  );
};

export { ActionRecord };
