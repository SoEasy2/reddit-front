import React, { useState } from "react";
import Active from "../../../../../../assets/select/active.svg";
import styles from "./Select.module.scss";
import UnActive from "../../../../../../assets/select/notactive.svg";
import { Overflow } from "../../../../../../containers/Overflow";
import { Option } from "./Option";
import cx from "classnames";
import { IData } from "./types";

interface IProps {
  placeholder?: string;
  className?: string;
  data: IData[];
  setItemPerPage(data: IData): void;
}

const Select: React.FC<IProps> = ({
  placeholder,
  className,
  data,
  setItemPerPage,
}) => {
  const [isActive, setActive] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<IData | null>(null);
  const optionHandle = (data: IData) => {
    setCurrentValue(data);
    setItemPerPage(data.value);
    setActive(false);
  };
  return (
    <div className={cx(styles.select, className)}>
      <div className={styles.wrapperOption}>
        <button className={styles.button} onClick={() => setActive(!isActive)}>
          <p>{currentValue ? currentValue.label : placeholder}</p>
          <img
            src={isActive ? Active : UnActive}
            alt=""
            className={styles.img}
          />{" "}
        </button>
        {isActive ? (
          <Overflow className={styles.overflow}>
            {data.map((item, index) => (
              <Option optionHandle={optionHandle} data={item} key={index} />
            ))}
          </Overflow>
        ) : null}
      </div>
    </div>
  );
};

export { Select };
