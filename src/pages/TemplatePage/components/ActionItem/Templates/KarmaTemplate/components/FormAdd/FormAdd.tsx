import React, { useState } from "react";
import styles from "./FormAdd.module.scss";
import { Checkbox } from "../../../../../../../../components/Ui-kit/checkbox";
import { EditingConfirmationButton } from "../../../../../../../../components/Ui-kit/editingConfirmationButton";

interface IConfirm {
  status: "create" | "update" | "delete";
  active: boolean;
}

interface IProps {
  handleCreate(data: string): void;
  setConfirm(data: IConfirm): void;
}

const FormAdd: React.FC<IProps> = ({ handleCreate, setConfirm }) => {
  const [post, setPost] = useState<string>("");
  const handleCreatePost = () => {
    handleCreate(post);
    setPost("");
    setConfirm({ status: "create", active: true });
  };
  return (
    <div className={styles.form}>
      <div className={styles.wrapper}>
        <div className={styles.checkBox}>
          <Checkbox />
        </div>
        <div className={styles.url}>
          <input
            name={"title"}
            type="text"
            value={post}
            className={styles.input}
            onChange={(e) => setPost(e.target.value)}
          />
        </div>
        <div className={styles.action}>
          <EditingConfirmationButton onClick={handleCreatePost} />
        </div>
      </div>
    </div>
  );
};

export { FormAdd };
