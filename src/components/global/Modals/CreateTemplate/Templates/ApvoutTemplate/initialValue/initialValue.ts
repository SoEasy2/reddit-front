import { ICreateApvoutDto } from "../../../../../../../redux/preset/dto/Template/Apvout/create-apvout-dto";
import { IPreset } from "../../../../../../../redux/preset/dto/Template/preset";

export const initialValue: ICreateApvoutDto = {
  type: IPreset.Like,
  name: "",
  interval: "10",
  urls: [],
};
