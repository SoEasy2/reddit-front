import React, { useEffect, useState } from "react";
import styles from "./UsersPage.module.scss";
import { Header } from "../../components/global/header";
import Filter from "../../assets/filter.svg";
import { ReactComponent as Settings } from "../../assets/settings.svg";
import { Navbar } from "../../components/global/Navbar";
import { InputSearch } from "../../components/global/InputSearch";
import { ButtonAdd } from "../../components/global/ButtonAdd/ButtonAdd";
import { Container } from "../../containers/Container";
import Checkbox from "../../components/global/Checkbox/Checkbox";
import { Select } from "../../components/global/Select";
import { Pagination } from "../../components/global/Pagination";
import { IData } from "../../components/global/Select/types";
import { Filters } from "../../components/global/Modals/Filters";
import { FormAddUser } from "../../components/FormAddUser";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { UserItem } from "../../components/UserItem";
import { ButtonSettingUsers } from "../../components/ButtonFilterUsers";
import {
  fetchCreateUser,
  fetchDeleteUser,
  fetchGetUsers,
  fetchSearchUser,
  fetchUpdateUser,
  fetchUsersCount,
} from "../../redux/users/UsersSlice";
import { ICreteUserDto } from "../../models/crete-user-dto";
import { DatabaseAlert } from "../../components/Ui-kit/databaseAlert";
import { IUser } from "../../redux/users/types";
import { Alert } from "../../components/Ui-kit/alert";
import { Overflow } from "../../containers/Overflow";

interface IModal {
  status: boolean;
  type: string;
}
const initialValue = {
  login: "",
  password: "",
  subscribeDate: "",
  banned: false,
};
interface IAlert {
  status: boolean;
  type: "success" | "error" | "cancel" | "";
}
const UsersPage = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.usersReducer);
  const [itemPerPage, setItemPerPage] = useState<IData>({
    label: "100",
    value: "100",
  });
  const [isPrompt, setPrompt] = useState<boolean>();
  const [isFilter, setFilter] = useState<boolean>(false);
  const [isFormAdd, setFormAdd] = useState<boolean>(false);
  const [focusUser, setFocusUser] = useState<IUser | null>(null);
  const [createDtoUser, setCreateDtoUser] =
    useState<ICreteUserDto>(initialValue);
  const [isAlert, setAlert] = useState<IAlert>({
    status: false,
    type: "",
  });
  const [modalAction, setModalAction] = useState<IModal>({
    status: false,
    type: "",
  });

  const handleModal = (data: string) => {
    setModalAction({
      status: true,
      type: data,
    });
  };
  const showAlert = (type: "success" | "error" | "cancel", status: boolean) => {
    setAlert({
      status,
      type,
    });
    setTimeout(() => {
      setModalAction({
        status: false,
        type: "",
      });
    }, 3000);
  };
  const onClickCLoseAlert = () => {
    setAlert({
      status: false,
      type: "",
    });
  };
  const handleActionUser = (event: any) => {
    if (event.target.name === "create") {
      if (
        createDtoUser.login != "" &&
        createDtoUser.password != "" &&
        createDtoUser.subscribeDate != ""
      ) {
        showAlert("success", true);
        dispatch(fetchCreateUser(createDtoUser));
        setFormAdd(false);
        setCreateDtoUser(initialValue);
      } else {
        showAlert("error", true);
      }
    } else if (event.target.name === "update") {
      if (
        focusUser &&
        focusUser.login != "" &&
        focusUser.password != "" &&
        focusUser.subscribeDate != ""
      ) {
        dispatch(fetchUpdateUser(focusUser));
        showAlert("success", true);
      } else {
        showAlert("error", true);
      }
    } else if (event.target.name === "delete") {
      if (focusUser) {
        dispatch(fetchDeleteUser(focusUser));
      }
    }
    setModalAction({
      status: false,
      type: "",
    });
  };
  const handleSearch = (event: any) => {
    if (event.key == "Enter") {
      if (event.target.value == "") {
        dispatch(fetchUsersCount());
        dispatch(fetchGetUsers({ indent: 0, take: +itemPerPage.value }));
      } else {
        dispatch(fetchSearchUser(event.target.value));
      }
    }
  };
  const handleChangeInput = (event: any) => {
    event.target.name == "banned"
      ? setCreateDtoUser((prev) => ({ ...prev, banned: !createDtoUser.banned }))
      : setCreateDtoUser((prev) => ({
          ...prev,
          [event.target.name]: event.target.value,
        }));
  };
  useEffect(() => {
    dispatch(fetchUsersCount());
    dispatch(fetchGetUsers({ indent: 0, take: +itemPerPage.value }));
  }, []);
  return (
    <div className={styles.users}>
      {isFilter ? <Filters setShow={setFilter} /> : null}
      {modalAction.status ? (
        <DatabaseAlert
          type={modalAction.type}
          className={styles.alert}
          onClick={handleActionUser}
        />
      ) : null}
      {isAlert.status ? (
        <Alert
          type={isAlert.type}
          className={styles.prompt}
          onClick={onClickCLoseAlert}
        />
      ) : null}
      <Navbar />
      <div className={styles.contents}>
        <Header name={"Пользователи"} />
        <Container>
          <div className={styles.filterWrapper}>
            <InputSearch
              className={styles.search}
              handleSearch={handleSearch}
            />
            <div className={styles.buttons}>
              <ButtonSettingUsers
                img={Filter}
                className={styles.filterBtn}
                handleClick={setFilter}
              />
              <ButtonSettingUsers className={styles.settingsBtn}>
                <Settings className={styles.settings} />
              </ButtonSettingUsers>
              <ButtonAdd onClick={setFormAdd}>Добавить пользователя</ButtonAdd>
            </div>
          </div>

          <div className={styles.viewUsers}>
            <div className={styles.itemWrapper}>
              <div className={styles.smallFlow}>
                <Checkbox
                  className={styles.checkbox}
                  name={"selectAll"}
                  value={false}
                />
              </div>
              <div className={styles.workFlow}>
                <p className={styles.element}>Логин</p>
                <p className={styles.element}>Пароль</p>
                <p className={styles.element}>Подписка до</p>
              </div>
              <div className={styles.smallFlow}>
                <p className={styles.element}>Бан</p>
              </div>
            </div>
            <Overflow>
              {isFormAdd ? (
                <FormAddUser
                  setShow={setFormAdd}
                  setPrompt={setPrompt}
                  actionModal={handleModal}
                  user={createDtoUser}
                  handleChangeInput={handleChangeInput}
                />
              ) : null}
              {users.data.map((item) => (
                <UserItem
                  checked={false}
                  data={item}
                  key={item.id}
                  handleModal={handleModal}
                  setFocusUser={setFocusUser}
                />
              ))}
            </Overflow>
          </div>

          <div className={styles.paginationContainer}>
            <div className={styles.containerSelect}>
              <Select
                itemPerPage={itemPerPage}
                setItemPerPage={setItemPerPage}
                data={[
                  { label: "100", value: "100" },
                  { label: "200", value: "200" },
                  { label: "300", value: "300" },
                  { label: "400", value: "400" },
                ]}
              />
              <p>Элементов на странице</p>
            </div>
            <Pagination
              arrayCount={users.count}
              itemsPerPage={+itemPerPage.value}
              className={styles.pagination}
              activeLinkClassName={styles.activePage}
              buttonArrow={styles.buttonArrow}
              pageLinkClassName={styles.buttonPagination}
              arrowLeft={styles.left}
              arrowRight={styles.right}
            />
          </div>
        </Container>
      </div>
    </div>
  );
};

export { UsersPage };
