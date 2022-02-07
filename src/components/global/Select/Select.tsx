import React, { useState } from "react";
import styles from "./Select.module.scss";
import { IData } from "./types";
import { Option } from "./Option";
import Active from "../../../assets/select/active.svg";
import UnActive from "../../../assets/select/notactive.svg";
import cx from "classnames";

interface IProps {
  data: IData[];
  className?: string;
  setItemPerPage(data: IData): void;
  itemPerPage: IData;
}

const Select: React.FC<IProps> = ({
  data,
  className,
  setItemPerPage,
  itemPerPage,
}) => {
  const [isActive, setActive] = useState<boolean>(false);
  const handleClick = (data: IData) => {
    setItemPerPage(data);
    setActive(false);
  };
  return (
    <div className={styles.select}>
      <div className={cx(styles.wrapperOption, styles.activeOption)}>
        {isActive
          ? data.map((item, index) => (
              <Option data={item} key={index} handleClick={handleClick} />
            ))
          : null}
        <button className={styles.button} onClick={() => setActive(!isActive)}>
          {itemPerPage.label}{" "}
          <img
            src={isActive ? Active : UnActive}
            alt=""
            className={styles.img}
          />
        </button>
      </div>
    </div>
  );
};

export { Select };
