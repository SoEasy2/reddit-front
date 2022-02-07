import { IPreset } from "../../../../redux/preset/dto/Template/preset";

export interface IAction {
  active: boolean;
  type: IPreset;
  id: number;
}
