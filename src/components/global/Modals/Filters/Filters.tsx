import React, { useState } from "react";
import styles from "./Filters.module.scss";
import Checkbox from "../../Checkbox/Checkbox";
import Calendar from "../../../../assets/calendar.svg";

interface IProps {
  setShow(data: boolean): void;
}
const Filters: React.FC<IProps> = ({ setShow }) => {
  const [dateValue, setDateValue] = useState<string>("");
  const handleInputChange = (event: any) => {
    setDateValue(event.target.value);
  };
  return (
    <div className={styles.filter} onClick={() => setShow(false)}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.wrapper}>
          <h5 className={styles.title}>Фильтрация</h5>
        </div>
        <hr className={styles.hr} />
        <div className={styles.wrapper}>
          <form action="" className={styles.form}>
            <div className={styles.params}>
              <div className={styles.wrapperForm}>
                {/*<img src={Calendar} alt="" className={styles.img}/>*/}
                <p className={styles.text}>Подписка до</p>
                <input
                  type="date"
                  value={dateValue}
                  name={"dateTo"}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.wrapperForm}>
                <p className={styles.text}>Бан</p>
                <Checkbox value={false} name={"banned"} />
              </div>
            </div>
            <div className={styles.buttons}>
              <button className={styles.button}>Сбросить</button>
              <button className={styles.button}>Применить</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { Filters };
