import { ICreateKarmaDto } from "../../../../../../../redux/preset/dto/Template/Karma/create-karma-dto";
import { IPreset } from "../../../../../../../redux/preset/dto/Template/preset";

export const initialValue: ICreateKarmaDto = {
  name: "",
  subreddit: [],
  interval: "10",
  type: IPreset.Karma,
};
