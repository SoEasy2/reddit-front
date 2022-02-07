import React, { useEffect, useState } from "react";
import styles from "./Item.module.scss";
import { Flag } from "../Flag";
import { IPost } from "../../../../../../../../redux/preset/dto/Template/Posting/create-template-dto";
import { Checkbox } from "../../../../../../../../components/Ui-kit/checkbox";
import { EditingConfirmationButton } from "../../../../../../../../components/Ui-kit/editingConfirmationButton";
import { MoreHorizontalButton } from "../../../../../../../../components/Ui-kit/moreHorizontalButton";
import { ActionRecord } from "../../../../../../../../components/global/Modals/ActionRecord";

interface IProps {
  data: IPost;
  index: number;
  handleDeletePost(data: IPost): void;
  handleUpdatePost(data: IPost): void;
}
const Item: React.FC<IProps> = ({
  data,
  index,
  handleDeletePost,
  handleUpdatePost,
}) => {
  const [isAction, setAction] = useState<boolean>(false);
  const [isAddFlag, setAddFlag] = useState<boolean>(false);
  const [isChange, setChange] = useState<boolean>(false);
  const [post, setPost] = useState<IPost>(data);
  const handleChange = (event: any) => {
    setPost((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const [flair, setFlair] = useState<string>("");
  const handleChangeFlair = (event: any) => {
    setFlair(event.target.value);
  };
  const handleCreateFlair = () => {
    setPost((prev) => ({ ...prev, flairs: [...post.flairs, flair] }));
    setAddFlag(false);
  };
  const handleUpdate = () => {
    handleUpdatePost(post);
    setChange(false);
  };
  return (
    <div className={styles.item}>
      <div className={styles.wrapper}>
        <div className={styles.checkBox}>
          <Checkbox />
        </div>
        <div className={styles.titleTemplate}>
          {isChange ? (
            <input
              type="text"
              className={styles.input}
              name={"title"}
              onChange={handleChange}
              value={post.title}
            />
          ) : (
            <p className={styles.p}>{post.title}</p>
          )}
        </div>
        <div className={styles.url}>
          {isChange ? (
            <input
              type="text"
              className={styles.input}
              onChange={handleChange}
              name={"url"}
              value={post.url}
            />
          ) : (
            <p className={styles.p}>{post.url}</p>
          )}
        </div>
        <div className={styles.text}>
          {isChange ? (
            <input
              type="text"
              className={styles.input}
              onChange={handleChange}
              name={"text"}
              value={post.text}
            />
          ) : (
            <p className={styles.p}>{post.text}</p>
          )}
        </div>
        <div className={styles.subredit}>
          {isChange ? (
            <input
              type="text"
              className={styles.input}
              onChange={handleChange}
              name={"subreddit"}
              value={post.subreddit}
            />
          ) : (
            <p className={styles.p}>{post.subreddit}</p>
          )}
        </div>
        <div className={styles.comments}>
          {isChange ? (
            <input
              type="text"
              className={styles.input}
              onChange={handleChange}
              name={"comment"}
              value={post.comment}
            />
          ) : (
            <p className={styles.p}>{post.comment}</p>
          )}
        </div>
        <div className={styles.flag}>
          {isAddFlag ? (
            <>
              <input
                type="text"
                className={styles.inputFlag}
                onChange={handleChangeFlair}
              />
              <EditingConfirmationButton
                className={styles.confirm}
                onClick={handleCreateFlair}
              />
            </>
          ) : (
            <Flag setAddFlag={setAddFlag} post={post} />
          )}
        </div>
        <div className={styles.action}>
          {isChange ? (
            <EditingConfirmationButton onClick={handleUpdate} />
          ) : (
            <MoreHorizontalButton
              className={styles.actionButton}
              onClick={() => setAction(!isAction)}
            />
          )}
          {isAction ? (
            <ActionRecord
              onClickChange={setChange}
              setActionShow={setAction}
              isDelete={true}
              className={styles.actionRecord}
              handleDelete={() => handleDeletePost(post)}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export { Item };
