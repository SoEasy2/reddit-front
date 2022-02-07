import React, { useState } from "react";
import styles from "./ApvoutTemplate.module.scss";
import { ModalClosingButton } from "../../../../../Ui-kit/modalClosingButton";
import { MoreVerticalButton } from "../../../../../Ui-kit/moreVerticalButton";
import { ButtonAdd } from "../../../../ButtonAdd/ButtonAdd";
import { Checkbox } from "../../../../../Ui-kit/checkbox";
import { Overflow } from "../../../../../../containers/Overflow";
import { initialValue } from "./initialValue/initialValue";
import { ICreateApvoutDto } from "../../../../../../redux/preset/dto/Template/Apvout/create-apvout-dto";
import { FormAdd } from "./components/FormAdd";
import { DatabaseAlert } from "../../../../../Ui-kit/databaseAlert";
import { Item } from "./components/Item";
import { useAppDispatch } from "../../../../../../hooks/redux";
import { fetchCreateApvout } from "../../../../../../redux/preset/PresetSlice";

interface IConfirm {
  status: "create" | "update" | "delete" | "";
  active: boolean;
}
interface IProps {
  close(): void;
}

const ApvoutTemplate: React.FC<IProps> = ({ close }) => {
  const [posts, setPosts] = useState<ICreateApvoutDto>(initialValue);
  const [isCreate, setCreate] = useState<boolean>(false);
  const [deletePost, setDeletePost] = useState<string>();
  const dispatch = useAppDispatch();
  const [createPost, setCreatePost] = useState<string>("");
  const [isSave, setSave] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<IConfirm>({
    status: "",
    active: false,
  });
  const handleSave = () => {
    setSave(true);
    setConfirm({ active: true, status: "create" });
  };
  const [updatePost, setUpdatePost] = useState<string>("");
  const handleUpdate = (data: string) => {
    setUpdatePost(data);
    setConfirm({
      status: "update",
      active: true,
    });
  };
  const handleDelete = (data: string) => {
    setDeletePost(data);
    setConfirm({ status: "delete", active: true });
  };
  const handleChangeInput = (event: any) => {
    setPosts((prev) => ({ ...prev, name: event.target.value }));
  };
  const handleOpenForm = () => {
    posts.name.trim() !== "" ? setCreate(true) : null;
  };
  const getTimeFromMins = (mins: number) => {
    const hours = `0${Math.trunc(mins / 60)}`;
    const minutes = `0${mins % 60}`;
    return `${hours.split("").slice(-2).join("")}:${minutes
      .split("")
      .slice(-2)
      .join("")}:00`;
  };
  const handleActionPost = (event: any) => {
    console.log(event);
    const time = getTimeFromMins(+posts.interval);
    if (event.target.name === "create") {
      if (isSave) {
        dispatch(fetchCreateApvout({ ...posts, interval: time }));
        setSave(false);
        close();
      } else {
        setPosts((prev) => ({ ...prev, urls: [...posts.urls, createPost] }));
        setCreate(false);
      }
    } else if (event.target.name === "delete") {
      setPosts((prev) => ({
        ...prev,
        urls: posts.urls.filter((item) => item !== deletePost),
      }));
    }
    setConfirm({
      status: "",
      active: false,
    });
  };
  const handleChangeInterval = (event: any) => {
    if (
      Number.isInteger(+event.target.value) &&
      +event.target.value >= 0 &&
      +event.target.value < 150
    ) {
      setPosts({ ...posts, interval: `${event.target.value}` });
    } else {
      setPosts({ ...posts, interval: `10` });
    }
  };

  return (
    <div className={styles.modal}>
      {confirm.active ? (
        <DatabaseAlert
          type={confirm.status}
          className={styles.databaseAlert}
          onClick={handleActionPost}
        />
      ) : null}
      <div className={styles.contents}>
        <div className={styles.wrapper}>
          <div className={styles.head}>
            <h4 className={styles.title}>
              Шаблон: <span>Aпвоут постов</span>
            </h4>
            <ModalClosingButton onClick={close} />
          </div>
        </div>
        <div className={styles.hr}></div>
        <div className={styles.wrapper}>
          <div className={styles.wrapperAction}>
            <div className={styles.wrapperInput}>
              <input
                type="text"
                placeholder={"Название шаблона"}
                className={styles.input}
                onChange={handleChangeInput}
              />
            </div>
            <MoreVerticalButton />
            <ButtonAdd onClick={handleOpenForm}>Добавить запись</ButtonAdd>
          </div>
          <div className={styles.viewTemplate}>
            <div className={styles.headTemplate}>
              <div className={styles.checkBox}>
                <Checkbox />
              </div>
              <div className={styles.url}>
                <p className={styles.p}>URL поста</p>
              </div>
            </div>
          </div>
          <Overflow className={styles.overflow}>
            {isCreate ? (
              <FormAdd setConfirm={setConfirm} handleCreate={setCreatePost} />
            ) : null}
            {posts.urls.map((item, index) => (
              <Item
                handleDeletePost={handleDelete}
                url={item}
                key={index}
                handleUpdatePost={handleUpdate}
              />
            ))}
          </Overflow>
          <div className={styles.settings}>
            <div className={styles.wrapperPosting}>
              <p className={styles.posting}>Интервал постинга:</p>
              <label htmlFor="" className={styles.label}>
                <input
                  type="text"
                  className={styles.interval}
                  value={posts.interval}
                  onChange={handleChangeInterval}
                />
                мин
              </label>
            </div>
            <ButtonAdd onClick={handleSave}>Сохранить</ButtonAdd>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ApvoutTemplate };
