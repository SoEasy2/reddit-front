import React from "react";
import styles from "./ChoiseTemplate.module.scss";
import { ModalClosingButton } from "../../../../Ui-kit/modalClosingButton";

interface IProps {
  close(): void;
  setTemplate(data: "Apvout" | "Karma" | "AutoPosting" | null): void;
}

const ChoiseTemplate: React.FC<IProps> = ({ close, setTemplate }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.contents}>
        <div className={styles.wrapper}>
          <div className={styles.head}>
            <h4 className={styles.title}>Выберите тип шаблона</h4>
            <ModalClosingButton onClick={close} />
          </div>
        </div>
        <div className={styles.hr}></div>
        <div className={styles.wrapper}>
          <div className={styles.buttons}>
            <button
              className={styles.button}
              onClick={() => setTemplate("AutoPosting")}
            >
              Автопостинг
            </button>
            <button
              className={styles.button}
              onClick={() => setTemplate("Apvout")}
            >
              Апвоут постов
            </button>
            <button
              className={styles.button}
              onClick={() => setTemplate("Karma")}
            >
              Накрутка кармы
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ChoiseTemplate };
