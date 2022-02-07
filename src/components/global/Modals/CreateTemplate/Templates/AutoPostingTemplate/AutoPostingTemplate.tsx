import React, { useState } from "react";
import styles from "./AutoPostingTemplate.module.scss";
import { ButtonAdd } from "../../../../ButtonAdd/ButtonAdd";
import { ModalClosingButton } from "../../../../../Ui-kit/modalClosingButton";
import { MoreVerticalButton } from "../../../../../Ui-kit/moreVerticalButton";
import { Checkbox } from "../../../../../Ui-kit/checkbox";
import { Overflow } from "../../../../../../containers/Overflow";
import { Item } from "./components/Item";
import { FormAdd } from "./components/FormAdd";
import {
  ICreateTemplateDto,
  IPost,
} from "../../../../../../redux/preset/dto/Template/Posting/create-template-dto";
import { initialValue } from "./initialValue";
import { DatabaseAlert } from "../../../../../Ui-kit/databaseAlert";
import { useAppDispatch } from "../../../../../../hooks/redux";
import { fetchCreatePosting } from "../../../../../../redux/preset/PresetSlice";

interface IConfirm {
  status: "create" | "update" | "delete" | "";
  active: boolean;
}

interface IProps {
  close(): void;
}

const AutoPostingTemplate: React.FC<IProps> = ({ close }) => {
  const [isCreate, setCreate] = useState<boolean>(false);
  const [isSave, setSave] = useState<boolean>(false);
  const [posts, setPosts] = useState<ICreateTemplateDto>(initialValue);
  const [updatePost, setUpdatePost] = useState<IPost>();
  const [deletePost, setDeletePost] = useState<IPost>();
  const dispatch = useAppDispatch();
  const [createPost, setCreatePost] = useState<IPost>({
    title: "",
    url: "",
    text: "",
    subreddit: "",
    flairs: [],
    comment: "",
  });
  const [confirm, setConfirm] = useState<IConfirm>({
    status: "",
    active: false,
  });
  const getTimeFromMins = (mins: number) => {
    const hours = `0${Math.trunc(mins / 60)}`;
    const minutes = `0${mins % 60}`;
    return `${hours.split("").slice(-2).join("")}:${minutes
      .split("")
      .slice(-2)
      .join("")}:00`;
  };
  const handleChangeInput = (event: any) => {
    setPosts((prev) => ({ ...prev, name: event.target.value }));
  };
  const handleOpenForm = () => {
    posts.name.trim() !== "" ? setCreate(true) : null;
  };
  const handleUpdatePost = (data: IPost) => {
    setUpdatePost(data);
    setConfirm({
      status: "update",
      active: true,
    });
  };
  const handleSavePost = () => {
    setSave(true);
    setConfirm({ status: "create", active: true });
  };
  const handleActionPost = (event: any) => {
    const time = getTimeFromMins(+posts.interval);
    if (event.target.name === "create") {
      if (isSave) {
        console.log(posts);
        dispatch(fetchCreatePosting({ ...posts, interval: time }));
        setPosts(initialValue);
        setCreate(false);
        setSave(false);
        close();
      } else {
        const array = [...posts.posts, createPost];
        setPosts({ ...posts, posts: [...array] });
        setCreatePost({
          title: "",
          text: "",
          url: "",
          subreddit: "",
          flairs: [],
          comment: "",
        });
        setCreate(false);
      }
    } else if (event.target.name === "update") {
      console.log();
    } else {
      setPosts((prev) => ({
        ...prev,
        posts: posts.posts.filter(
          (item) => JSON.stringify(item) !== JSON.stringify(deletePost)
        ),
      }));
    }
    setConfirm({
      status: "",
      active: false,
    });
  };
  const handleDelete = (data: IPost) => {
    setDeletePost(data);
    setConfirm({ status: "delete", active: true });
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
    <>
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
                Шаблон: <span>Автопостинг</span>
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
                  name={"name"}
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
                <div className={styles.titleTemplate}>
                  <p className={styles.p}>Заголовок</p>
                </div>
                <div className={styles.url}>
                  <p className={styles.p}>URL изображения</p>
                </div>
                <div className={styles.text}>
                  <p className={styles.p}>Текст поста</p>
                </div>
                <div className={styles.subredit}>
                  <p className={styles.p}>Сабреддит</p>
                </div>
                <div className={styles.comments}>
                  <p className={styles.p}>Комментарий</p>
                </div>
                <div className={styles.flag}>
                  <p className={styles.p}>Flags</p>
                </div>
              </div>
            </div>
            <Overflow className={styles.overflow}>
              {isCreate ? (
                <FormAdd
                  post={createPost}
                  setPost={setCreatePost}
                  handleCreate={() =>
                    setConfirm({ status: "create", active: true })
                  }
                />
              ) : null}
              {posts.posts.map((item, index) => (
                <Item
                  data={item}
                  key={index}
                  index={Date.now()}
                  handleDeletePost={handleDelete}
                  handleUpdatePost={handleUpdatePost}
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
              <ButtonAdd onClick={handleSavePost}>Сохранить</ButtonAdd>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AutoPostingTemplate;
