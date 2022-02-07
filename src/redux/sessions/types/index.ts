import { sessionUsersDto } from "./session-users-dto";
import { sessionPresetsDto } from "./session-presets-dto";

export enum StatusType {
  Work = "Work",
  Init = "Init",
  Wait = "Wait",
  Complete = "Complete",
  Error = "Error",
}

export interface ISessionsState {
  isLoading: boolean;
  error: any;
  totalCount: number;
  sessions: SessionsType[];
  users: sessionUsersDto[];
  presets: sessionPresetsDto[];
}

export type SessionsType = {
  sessionId: string;
  status: StatusType;
  login: string;
  presetName: string;
  dataEnd: string;
  dataStart: string;
  textResult: string;
};
