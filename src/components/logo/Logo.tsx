import React from "react";
import style from "./logo.module.scss";
import cx from "classnames";

interface Props {
  className?: string;
}

const Logo: React.FC<Props> = ({ className }) => {
  return (
    <div className={style.logo}>
      <div className={cx(style.circle, className)}></div>
      <h3>Anthill</h3>
    </div>
  );
};

export { Logo };
