import { IPreset } from "../preset";

export interface IPost {
  title: string;
  url: string;
  text: string;
  subreddit: string;
  flairs: string[];
  comment: string;
}
export interface ICreateTemplateDto {
  id?: number;
  type: IPreset;
  name: string;
  interval: string;
  posts: IPost[];
}
