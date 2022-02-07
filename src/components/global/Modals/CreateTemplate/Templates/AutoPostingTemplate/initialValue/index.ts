import { IPreset } from "../../../../../../../redux/preset/dto/Template/preset";
import { ICreateTemplateDto } from "../../../../../../../redux/preset/dto/Template/Posting/create-template-dto";

export const initialValue: ICreateTemplateDto = {
  type: IPreset.Posting,
  name: "",
  interval: "10",
  posts: [],
};
