import { IPreset } from "../../preset/dto/Template/preset";

export interface sessionPresetsDto {
  id: number;
  name: string;
  type: IPreset;
}
