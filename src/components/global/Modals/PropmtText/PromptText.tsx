import React from "react";
import styles from "./PromptText.module.scss";
import cx from "classnames";
interface IProps {
  text: string;
  className?: string;
}
const PromptText: React.FC<IProps> = ({ text, className }) => {
  return (
    <div className={cx(styles.content, className)}>
      <div className={styles.wrapper}>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export { PromptText };
