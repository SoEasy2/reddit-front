import React, { useEffect, useState } from "react";
import styles from "./SessionsPage.module.scss";
import { Navbar } from "../../components/global/Navbar";
import { Header } from "../../components/global/header";
import { Container } from "../../containers/Container";
import { InputSearch } from "../../components/global/InputSearch";
import { FilterListButton } from "../../components/Ui-kit/filterListButton";
import { MoreVerticalButton } from "../../components/Ui-kit/moreVerticalButton";
import { PlayButton } from "../../components/Ui-kit/playButton";
import { PauseButton } from "../../components/Ui-kit/pauseButton";
import { ButtonAdd } from "../../components/global/ButtonAdd/ButtonAdd";
import { Checkbox } from "../../components/Ui-kit/checkbox";
import { Overflow } from "../../containers/Overflow";
import { SessionItem } from "../../components/SessionItem";
import { Select } from "../../components/global/Select";
import { Pagination } from "../../components/global/Pagination";
import { IData } from "../../components/global/Select/types";
import { CreateSession } from "../../components/global/Modals/CreateSession";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchSessionPresets,
  fetchSessions,
  fetchSessionUsers,
  fetchStartSession,
  fetchStopSession,
  startSessionsListening,
  stopSessionsListening,
} from "../../redux/sessions/SessionsSlice";
import { RootState } from "../../redux/store";
import { useCheckboxesHandler } from "../../hooks/useCheckboxesHandler";

const SessionsPage = () => {
  const dispatch = useAppDispatch();
  const sessions = useAppSelector(
    (state: RootState) => state.sessionsReducer.sessions
  );
  const [isCreate, setCreate] = useState<boolean>(false);
  const [itemPerPage, setItemPerPage] = useState<IData>({
    label: "100",
    value: "100",
  });

  const sessionCheckboxes = useCheckboxesHandler();

  const playSessionsHandler = () => {
    if (sessionCheckboxes.inputChecked.length !== 0) {
      dispatch(
        fetchStartSession(sessionCheckboxes.inputChecked.map((e) => Number(e)))
      );
    }
  };

  const pauseSessionsHandler = () => {
    if (sessionCheckboxes.inputChecked.length !== 0) {
      dispatch(
        fetchStopSession(sessionCheckboxes.inputChecked.map((e) => Number(e)))
      );
    }
  };

  useEffect(() => {
    dispatch(fetchSessions());
    dispatch(startSessionsListening());
    dispatch(fetchSessionPresets());
    dispatch(fetchSessionUsers());
    return () => {
      stopSessionsListening();
    };
  }, []);

  return (
    <div className={styles.sessions}>
      {isCreate ? <CreateSession onClose={setCreate} /> : null}
      <Navbar />
      <div className={styles.contents}>
        <Header name={"Sessions"} />
        <Container>
          <div className={styles.filtersWrapper}>
            <InputSearch
              handleSearch={() => console.log("handle search")}
              className={styles.inputSearch}
            />
            <div className={styles.buttonsFilter}>
              <FilterListButton className={styles.filterButton} />
              <MoreVerticalButton className={styles.filterButton} />
            </div>
            <div className={styles.playWrapper}>
              <PlayButton
                onClick={playSessionsHandler}
                isActive={!(sessionCheckboxes.inputChecked.length === 0)}
                className={styles.playButton}
              />
              <PauseButton
                onClick={pauseSessionsHandler}
                isActive={!(sessionCheckboxes.inputChecked.length === 0)}
                className={styles.playButton}
              />
            </div>
            <ButtonAdd onClick={setCreate}>Добавить сессию</ButtonAdd>
          </div>
          <div className="viewSessions">
            <div className={styles.headerWrapper}>
              <div className={styles.select}>
                <Checkbox />
              </div>
              <div className={styles.status}>
                <p className={styles.text}>Статус</p>
              </div>
              <div className={styles.login}>
                <p className={styles.text}>Логин</p>
              </div>
              <div className={styles.template}>
                <p className={styles.text}>Название шаблона</p>
              </div>
              <div className={styles.startDate}>
                <p className={styles.text}>Начало</p>
              </div>
              <div className={styles.endDate}>
                <p className={styles.text}>Конец</p>
              </div>
            </div>
            <Overflow>
              {sessions.map((session) => (
                <SessionItem
                  key={session.sessionId}
                  status={session.status}
                  login={session.login}
                  dataEnd={session.dataEnd}
                  dataStart={session.dataStart}
                  presetName={session.presetName}
                  sessionId={session.sessionId}
                  textResult={session.textResult}
                  onChangeItem={sessionCheckboxes.itemCheckedHandler}
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
              arrayCount={300}
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

export { SessionsPage };
