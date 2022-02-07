import React, { useState } from "react";
import { Navbar } from "../../components/global/Navbar";
import { Header } from "../../components/global/header";
import styles from "./Autoregistration.module.scss";
import { Container } from "../../containers/Container";
import { InputSearch } from "../../components/global/InputSearch";
import { FilterListButton } from "../../components/Ui-kit/filterListButton";
import { MoreVerticalButton } from "../../components/Ui-kit/moreVerticalButton";
import { ButtonAdd } from "../../components/global/ButtonAdd/ButtonAdd";
import { PlayButton } from "../../components/Ui-kit/playButton";
import { PauseButton } from "../../components/Ui-kit/pauseButton";
import { Overflow } from "../../containers/Overflow";
import { Checkbox } from "../../components/Ui-kit/checkbox";
import { AutoRegistrationItem } from "../../components/AutoRegistrationItem";
import { Select } from "../../components/global/Select";
import { Pagination } from "../../components/global/Pagination";
import { IData } from "../../components/global/Select/types";
import { CreateAutoregistration } from "../../components/global/Modals/CreateAutoregistration";

const Autoregistration = () => {
  const [itemPerPage, setItemPerPage] = useState<IData>({
    label: "100",
    value: "100",
  });
  const [isCreate, setCreate] = useState(false);
  return (
    <div className={styles.autoregistration}>
      {isCreate ? <CreateAutoregistration setSnow={setCreate} /> : null}
      <Navbar />
      <div className={styles.contents}>
        <Header name={"Авторегистрация"} />
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
              <PlayButton isActive={false} className={styles.playButton} />
              <PauseButton isActive={false} className={styles.playButton} />
            </div>
            <ButtonAdd onClick={setCreate}>Добавить регистрацию</ButtonAdd>
          </div>

          <div className={styles.viewRecord}>
            <div className={styles.headWrapper}>
              <div className={styles.selectFlow}>
                <Checkbox checked={true} />
              </div>
              <div className={styles.status}>
                <p className={styles.text}>Статус</p>
              </div>
              <div className={styles.loginFlow}>
                <p className={styles.text}>Логин</p>
              </div>
              <div className={styles.startDateFlow}>
                <p className={styles.text}>Начало</p>
              </div>
              <div className={styles.endDateFlow}>
                <p className={styles.text}>Конец</p>
              </div>
              <div className={styles.totalFlow}>
                <p className={styles.text}>Итог</p>
              </div>
            </div>
            <Overflow>
              <AutoRegistrationItem />
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

export { Autoregistration };
