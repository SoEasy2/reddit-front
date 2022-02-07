export interface IUser {
  id: number;
  login: string;
  password: string;
  banned: boolean;
  subscribeDate: string;
}
export interface IUserState {
  users: {
    isLoading: boolean;
    error: any;
    data: IUser[];
    count: number;
  };
}
