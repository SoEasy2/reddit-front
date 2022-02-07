import React, { useEffect, useState } from "react";
import styles from "./FormAdd.module.scss";
import { Flag } from "../Flag";
import { Checkbox } from "../../../../../../../Ui-kit/checkbox";
import { EditingConfirmationButton } from "../../../../../../../Ui-kit/editingConfirmationButton";
import { IPost } from "../../../../../../../../redux/preset/dto/Template/Posting/create-template-dto";

interface IProps {
  handleCreate(): void;
  post: IPost;
  setPost(
    data: (prev: IPost) => {
      flairs: string[];
      comment: string;
      text: string;
      title: string;
      url: string;
      subreddit: string;
    }
  ): void;
}

const FormAdd: React.FC<IProps> = ({ post, setPost, handleCreate }) => {
  const [flair, setFlair] = useState<string>("");
  const handleChangeInput = (event: any) => {
    setPost((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const handleChangeFlair = (event: any) => {
    setFlair(event.target.value);
  };
  const handleCreateFlair = () => {
    setPost((prev) => ({ ...prev, flairs: [...post.flairs, flair] }));
    setCreateFlair(false);
  };
  const [isCreateFlair, setCreateFlair] = useState<boolean>(false);

  return (
    <div className={styles.form}>
      <div className={styles.wrapper}>
        <div className={styles.checkBox}>
          <Checkbox />
        </div>
        <div className={styles.titleTemplate}>
          <input
            name={"title"}
            type="text"
            className={styles.input}
            onChange={handleChangeInput}
          />
        </div>
        <div className={styles.url}>
          <input
            name={"url"}
            type="text"
            className={styles.input}
            onChange={handleChangeInput}
          />
        </div>
        <div className={styles.text}>
          <input
            name={"text"}
            type="text"
            className={styles.input}
            onChange={handleChangeInput}
          />
        </div>
        <div className={styles.subredit}>
          <input
            name={"subreddit"}
            type="text"
            className={styles.input}
            onChange={handleChangeInput}
          />
        </div>
        <div className={styles.comments}>
          <input
            name={"comment"}
            type="text"
            className={styles.input}
            onChange={handleChangeInput}
          />
        </div>
        <div className={styles.flag}>
          {isCreateFlair ? (
            <>
              <input
                name={"flair"}
                type="text"
                className={styles.inputFlag}
                onChange={handleChangeFlair}
              />
              <EditingConfirmationButton
                className={styles.confirm}
                onClick={handleCreateFlair}
              />{" "}
            </>
          ) : (
            <Flag setAddFlag={setCreateFlair} post={post} />
          )}
        </div>
        <div className={styles.action}>
          <EditingConfirmationButton
            className={styles.create}
            onClick={handleCreate}
          />
        </div>
      </div>
    </div>
  );
};

export { FormAdd };
