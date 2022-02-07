import { IPreset } from "../dto/Template/preset";
interface IData {
  id: number;
  presetName: string;
  presetType: IPreset;
}
export interface IState {
  count: number;
  isLoading: boolean;
  error: any;
  data: IData[] | null;
}
