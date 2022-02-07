import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/global/Navbar";
import styles from "./TemplatePage.module.scss";
import { Header } from "../../components/global/header";
import { InputSearch } from "../../components/global/InputSearch";
import { MoreVerticalButton } from "../../components/Ui-kit/moreVerticalButton";
import { ButtonAdd } from "../../components/global/ButtonAdd/ButtonAdd";
import { Container } from "../../containers/Container";
import { FilterListButton } from "../../components/Ui-kit/filterListButton";
import { Checkbox } from "../../components/Ui-kit/checkbox";
import { Overflow } from "../../containers/Overflow";
import { Select } from "../../components/global/Select";
import { Pagination } from "../../components/global/Pagination";
import { IData } from "../../components/global/Select/types";
import { CreateTemplate } from "../../components/global/Modals/CreateTemplate";
import { Item } from "./components/Item";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchGetPreset,
  fetchSearchPreset,
} from "../../redux/preset/PresetSlice";
import { IAction } from "./components/types";
import { IPreset } from "../../redux/preset/dto/Template/preset";
import { ActionItem } from "./components/ActionItem";

const TemplatePage = () => {
  const [itemPerPage, setItemPerPage] = useState<IData>({
    label: "100",
    value: "100",
  });
  const [actionItem, setActionItem] = useState<IAction | null>(null);
  const [isCreate, setCreate] = useState<boolean>(false);
  const { data } = useAppSelector((state) => state.presetReducer);
  const { count } = useAppSelector((state) => state.presetReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchGetPreset({ skip: 0, take: 100 }));
  }, []);
  const searchHandle = (event: any) => {
    if (event.key == "Enter") {
      if (event.target.value.trim() !== "") {
        dispatch(fetchSearchPreset(event.target.value.trim()));
      } else {
        dispatch(fetchGetPreset({ skip: 0, take: +itemPerPage.value }));
      }
    }
  };
  const handleAction = (data: IPreset, id: number) => {
    setActionItem({
      active: true,
      type: data,
      id,
    });
  };
  return (
    <div className={styles.template}>
      {isCreate ? <CreateTemplate close={() => setCreate(false)} /> : null}
      {actionItem && actionItem.active ? (
        <ActionItem action={actionItem} setAction={setActionItem} />
      ) : null}
      <Navbar />
      <div className={styles.contents}>
        <Header name={"Template"} />
        <Container>
          <div className={styles.wrapperAction}>
            <InputSearch handleSearch={searchHandle} className={styles.input} />
            <MoreVerticalButton />
            <FilterListButton />
            <ButtonAdd onClick={() => setCreate(true)}>
              Добавить шаблон
            </ButtonAdd>
          </div>
          <div className={styles.viewTemplate}>
            <div className={styles.headTemplate}>
              <div className={styles.checkBox}>
                <Checkbox />
              </div>
              <div className={styles.name}>
                <p className={styles.text}>Название шаблона</p>
              </div>
              <div className={styles.type}>
                <p className={styles.text}>Тип шаблона</p>
              </div>
            </div>
            <Overflow>
              {data
                ? data.map((item) => (
                    <Item
                      handleAction={handleAction}
                      presetName={item.presetName}
                      presetType={item.presetType}
                      id={item.id}
                    />
                  ))
                : null}
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
              arrayCount={count}
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

export { TemplatePage };
