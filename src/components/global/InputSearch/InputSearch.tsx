import React from "react";
import search from "../../../assets/search-icon.svg";
import styles from "./InputSearch.module.scss";
import cx from "classnames";
interface IProps {
  className?: string;
  handleSearch(event: any): void;
}

const InputSearch: React.FC<IProps> = ({ className, handleSearch }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <input
        className={styles.input}
        type="text"
        placeholder={"Поиск"}
        onKeyDown={handleSearch}
      />
      <img src={search} className={styles.img} alt="" />
    </div>
  );
};

export { InputSearch };
