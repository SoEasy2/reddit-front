import React, { useEffect, useState } from "react";
import styles from "./KarmaTemplate.module.scss";
import { Overflow } from "../../../../../../containers/Overflow";
import { ICreateKarmaDto } from "../../../../../../redux/preset/dto/Template/Karma/create-karma-dto";
import { initialValue } from "./initialValue/initialValue";
import { useAppDispatch } from "../../../../../../hooks/redux";
import { FormAdd } from "./components/FormAdd";
import { Item } from "./components/Item/Item";
import { DatabaseAlert } from "../../../../../../components/Ui-kit/databaseAlert";
import { ModalClosingButton } from "../../../../../../components/Ui-kit/modalClosingButton";
import { MoreVerticalButton } from "../../../../../../components/Ui-kit/moreVerticalButton";
import { ButtonAdd } from "../../../../../../components/global/ButtonAdd/ButtonAdd";
import { Checkbox } from "../../../../../../components/Ui-kit/checkbox";
import { IAction } from "../../../types";
import { getKarmaById, updatePresetKarma } from "../../../../../../api/preset";

interface IConfirm {
  status: "create" | "update" | "delete" | "";
  active: boolean;
}

interface IProps {
  action: IAction | null;
  setAction(data: IAction | null): void;
}

const KarmaTemplate: React.FC<IProps> = ({ action, setAction }) => {
  const [posts, setPosts] = useState<ICreateKarmaDto>(initialValue);
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
  useEffect(() => {
    (async () => {
      if (action) {
        const data = await getKarmaById(action.id);
        setPosts(data);
      }
    })();
  }, []);
  const getTimeFromMins = (mins: number) => {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    return hours + ":" + minutes + ":" + ":00";
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
  function convertH2M(timeInHour: string) {
    const timeParts = timeInHour.split(":");
    return Number(timeParts[0]) * 60 + Number(timeParts[1]);
  }
  const handleActionPost = async (event: any) => {
    const time = getTimeFromMins(+posts.interval);
    if (event.target.name === "create") {
      if (isSave) {
        await updatePresetKarma({
          ...posts,
          interval: time,
          id: action ? action.id : undefined,
        });
        setSave(false);
        setAction(null);
      } else {
        setPosts({ ...posts, subreddit: [...posts.subreddit, createPost] });
        setCreate(false);
      }
    } else if (event.target.name === "delete") {
      setPosts((prev) => ({
        ...prev,
        subreddit: posts.subreddit.filter((item) => item !== deletePost),
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
          headerText={isSave ? "Cохранение изменений" : undefined}
          contentText={isSave ? "Подтвердите изменение данных" : undefined}
        />
      ) : null}
      <div className={styles.contents}>
        <div className={styles.wrapper}>
          <div className={styles.head}>
            <h4 className={styles.title}>
              Шаблон: <span>Накрутка кармы</span>
            </h4>
            <ModalClosingButton onClick={() => setAction(null)} />
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
              <div className={styles.sub}>
                <p className={styles.p}>Сабреддит</p>
              </div>
            </div>
          </div>
          <Overflow className={styles.overflow}>
            {isCreate ? (
              <FormAdd setConfirm={setConfirm} handleCreate={setCreatePost} />
            ) : null}
            {posts.subreddit.map((item, index) => (
              <Item
                handleDeletePost={handleDelete}
                subreddit={item}
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
                  value={convertH2M(posts.interval)}
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

export { KarmaTemplate };
