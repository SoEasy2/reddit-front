import { IPreset } from "../preset";

export interface ICreateApvoutDto {
  id?: number;
  type: IPreset;
  name: string;
  interval: string;
  urls: string[];
}
