import React from "react";
import styles from "./Layout.module.scss";

const Layout: React.FC = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export { Layout };
