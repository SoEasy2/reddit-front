import React, { useState } from "react";
import styles from "./Item.module.scss";
import { Checkbox } from "../../../../../../../Ui-kit/checkbox";
import { EditingConfirmationButton } from "../../../../../../../Ui-kit/editingConfirmationButton";
import { MoreHorizontalButton } from "../../../../../../../Ui-kit/moreHorizontalButton";
import { ActionRecord } from "../../../../../ActionRecord";

interface IProps {
  subreddit: string;
  handleDeletePost(data: string): void;
  handleUpdatePost(data: string): void;
}

const Item: React.FC<IProps> = ({
  subreddit,
  handleDeletePost,
  handleUpdatePost,
}) => {
  const [isAction, setAction] = useState<boolean>(false);
  const [post, setPost] = useState<string>(subreddit);
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
              handleDelete={() => handleDeletePost(subreddit)}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export { Item };
