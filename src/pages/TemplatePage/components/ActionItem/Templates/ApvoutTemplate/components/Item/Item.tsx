import React, { useState } from "react";
import styles from "./item.module.scss";
import { Checkbox } from "../../../../../../../../components/Ui-kit/checkbox";
import { EditingConfirmationButton } from "../../../../../../../../components/Ui-kit/editingConfirmationButton";
import { MoreHorizontalButton } from "../../../../../../../../components/Ui-kit/moreHorizontalButton";
import { ActionRecord } from "../../../../../../../../components/global/Modals/ActionRecord";

interface IProps {
  url: string;
  handleDeletePost(data: string): void;
  handleUpdatePost(data: string): void;
}

const Item: React.FC<IProps> = ({
  url,
  handleDeletePost,
  handleUpdatePost,
}) => {
  const [isAction, setAction] = useState<boolean>(false);
  const [post, setPost] = useState<string>(url);
  const [isChange, setChange] = useState<boolean>(false);
  const handleUpdate = () => {
    handleUpdatePost(post);
    setChange(false);
  };
  const handleChange = (event: any) => {
    setPost(event.target.value);
  };
  return (
    <div className={styles.item}>
      <div className={styles.wrapper}>
        <div className={styles.checkBox}>
          <Checkbox />
        </div>
        <div className={styles.url}>
          {isChange ? (
            <input
              type="text"
              onChange={handleChange}
              className={styles.input}
              value={post}
            />
          ) : (
            <p className={styles.p}>{post}</p>
          )}
        </div>
        <div className={styles.action}>
          {isChange ? (
            <EditingConfirmationButton onClick={handleUpdate} />
          ) : (
            <MoreHorizontalButton onClick={() => setAction(!isAction)} />
          )}
          {isAction ? (
            <ActionRecord
              className={styles.actionRecord}
              onClickChange={setChange}
              setActionShow={setAction}
              isDelete={true}
              handleDelete={() => handleDeletePost(url)}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export { Item };
