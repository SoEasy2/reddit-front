import React from "react";
import { IAction } from "../types";
import { ApvoutTemplate } from "./Templates/ApvoutTemplate";
import AutoPostingTemplate from "./Templates/AutoPostingTemplate/AutoPostingTemplate";
import { KarmaTemplate } from "./Templates/KarmaTemplate/KarmaTemplate";
import { IPreset } from "../../../../redux/preset/dto/Template/preset";

interface IProps {
  action: IAction | null;
  setAction(data: IAction | null): void;
}
const ActionItem: React.FC<IProps> = ({ action, setAction }) => {
  return (
    <div>
      {action != null ? (
        action.type === IPreset.Like ? (
          <ApvoutTemplate action={action} setAction={setAction} />
        ) : action.type === IPreset.Posting ? (
          <AutoPostingTemplate action={action} setAction={setAction} />
        ) : (
          <KarmaTemplate action={action} setAction={setAction} />
        )
      ) : null}
    </div>
  );
};

export { ActionItem };
