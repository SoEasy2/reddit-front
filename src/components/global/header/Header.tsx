import React from "react";
import styles from "./Header.module.scss";
import profile from "../../../assets/profile.svg";
import notification from "../../../assets/notification.svg";
import { Container } from "../../../containers/Container";
import cx from "classnames";
interface IProps {
  name: string;
}

const Header: React.FC<IProps> = ({ name }) => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.wrapper}>
          <p className={styles.name}>{name}</p>
          <div className={styles.actions}>
            <button className={cx(styles.btn, styles.notification)}>
              <img src={notification} alt="asdsad" />
            </button>
            <span className={styles.border}></span>
            <button className={`${styles.btn} ${styles.profile}`}>
              <img src={profile} alt="das" />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export { Header };
