import React, { ReactNode, useEffect } from "react";
import styles from "./ButtonRoute.module.scss";
import { Link, useHistory } from "react-router-dom";
import cx from "classnames";

interface IProps {
  name: string;
  img: any;
  path: string;
}
const ButtonRoute: React.FC<IProps> = ({ name, img, path }) => {
  const params = useHistory();
  return (
    <Link
      className={cx(
        styles.button,
        path === params.location.pathname ? styles.activeButton : null
      )}
      to={path}
    >
      {img}
      <p>{name}</p>
    </Link>
  );
};

export { ButtonRoute };
