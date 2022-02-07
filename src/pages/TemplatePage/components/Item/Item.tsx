import React, { useState } from "react";
import styles from "./item.module.scss";
import { Checkbox } from "../../../../components/Ui-kit/checkbox";
import { MoreVerticalButton } from "../../../../components/Ui-kit/moreVerticalButton";
import { MoreHorizontalButton } from "../../../../components/Ui-kit/moreHorizontalButton";
import { ActionRecord } from "../../../../components/global/Modals/ActionRecord";
import { IPreset } from "../../../../redux/preset/dto/Template/preset";
import { useAppDispatch } from "../../../../hooks/redux";
import { fetchDeletePreset } from "../../../../redux/preset/PresetSlice";

interface IProps {
  presetName: string;
  presetType: IPreset;
  handleAction?(data: IPreset, id: number): void;
  id: number;
}

const Item: React.FC<IProps> = ({
  presetName,
  presetType,
  handleAction,
  id,
}) => {
  const [isAction, setAction] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(fetchDeletePreset(id));
  };
  return (
    <div className={styles.item}>
      <div className={styles.wrapper}>
        <div className={styles.checkBox}>
          <Checkbox />
        </div>
        <div className={styles.name}>
          <p className={styles.text}>{presetName}</p>
        </div>
        <div className={styles.type}>
          <p className={styles.text}>{presetType}</p>
        </div>
        <div className={styles.action}>
          <MoreHorizontalButton
            className={styles.actionButton}
            onClick={() => setAction(!isAction)}
          />
          {isAction ? (
            <ActionRecord
              onClickChange={() =>
                handleAction ? handleAction(presetType, id) : null
              }
              setActionShow={setAction}
              isDelete={true}
              className={styles.actionModal}
              handleDelete={handleDelete}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export { Item };
