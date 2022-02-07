import React from "react";
import style from "./UsersContainer.module.scss";

const UsersContainer: React.FC = ({ children }) => {
  return <div className={style.container}>{children}</div>;
};

export { UsersContainer };
