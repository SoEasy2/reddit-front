import { IPreset } from "../preset";

export interface ICreateKarmaDto {
  id?: number;
  type: IPreset;
  name: string;
  interval: string;
  subreddit: string[];
}
