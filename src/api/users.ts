import { IGetUsersDto } from "../models/get-users-dto";
import { $api } from "../http";
import { IUser } from "../redux/users/types";
import { ICreteUserDto } from "../models/crete-user-dto";

export const getUsers = async (dto: IGetUsersDto) => {
  const response = await $api.get(
    `User/getUsers?indent=${dto.indent}&take=${dto.take}`
  );
  return response.data.users;
};
export const getUsersCount = async () => {
  const response = await $api.get("User/getTotalCount");

  return response.data;
};
export const createUser = async (dto: ICreteUserDto) => {
  const response = await $api.post<IUser>("User/create", dto);
  return response.data;
};
export const deleteUser = async (dto: IUser) => {
  const response = await $api.delete("User/delete", { data: dto });
  console.log("delete");
  return dto;
};
export const updateUser = async (dto: IUser) => {
  const response = await $api.put("User/update", dto);
  return response.data;
};
export const searchUser = async (userName: string) => {
  const response = await $api.post(`User/search?userName=${userName}`, {});
  return response.data.users;
};
