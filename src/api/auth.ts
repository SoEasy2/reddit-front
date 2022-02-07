import { $api } from "../http";
import { ILogin } from "../models/login-dto";

export const login = async (dto: ILogin) => {
  const response = await $api.post(`token`, dto);
  return response.data;
};
