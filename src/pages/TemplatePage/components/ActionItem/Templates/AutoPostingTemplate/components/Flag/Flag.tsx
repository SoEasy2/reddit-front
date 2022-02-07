import React, { useEffect, useState } from "react";
import styles from "./Flag.module.scss";
import Active from "../../../../../../../../assets/select/active.svg";
import UnActive from "../../../../../../../../assets/select/notactive.svg";
import { Option } from "../Option";
import { IPost } from "../../../../../../../../redux/preset/dto/Template/Posting/create-template-dto";

interface IProps {
  setAddFlag?(data: boolean): void;
  post?: IPost | undefined;
}
const Flag: React.FC<IProps> = ({ setAddFlag, post }) => {
  const [isActive, setActive] = useState<boolean>(false);
  useEffect(() => {
    console.log(post);
  }, []);
  return (
    <div className={styles.flag}>
      <button className={styles.select} onClick={() => setActive(!isActive)}>
        <p>Флаг</p>
        <img src={isActive ? Active : UnActive} alt="img" />
      </button>
      {isActive ? (
        <div className={styles.optionWrapper}>
          {post
            ? post.flairs.map((item) => (
                <Option text={item} isCreate={false} setActive={setActive} />
              ))
            : null}
          <Option
            text={"Create"}
            isCreate={true}
            onClickCreate={setAddFlag}
            setActive={setActive}
          />
        </div>
      ) : null}
    </div>
  );
};

export { Flag };
