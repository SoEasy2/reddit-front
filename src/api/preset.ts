import { $api } from "../http";
import { ICreateTemplateDto } from "../redux/preset/dto/Template/Posting/create-template-dto";
import { IGetPresetDto } from "../redux/preset/dto/Template/get-preset-dto";
import { ICreateApvoutDto } from "../redux/preset/dto/Template/Apvout/create-apvout-dto";
import { ICreateKarmaDto } from "../redux/preset/dto/Template/Karma/create-karma-dto";

export const createPosting = async (dto: ICreateTemplateDto) => {
  const response = await $api.post("PresetSetting/createPosting", dto);
  return response.data;
};
export const getPreset = async (dto: IGetPresetDto) => {
  const response = await $api.get(
    `PresetSetting/get?skip=${dto.skip}&take=${dto.take}`
  );
  return response.data;
};
export const createApvout = async (dto: ICreateApvoutDto) => {
  const response = await $api.post("PresetSetting/createLike", dto);
  return response.data;
};
export const createKarma = async (dto: ICreateKarmaDto) => {
  const response = await $api.post("PresetSetting/createKarma", dto);
  return response.data;
};
export const searchPreset = async (presetName: string) => {
  const response = await $api.post(
    `PresetSetting/search?presetName=${presetName}`
  );
  return response.data;
};
export const getKarmaById = async (id: number) => {
  const response = await $api.get(`PresetSetting/getByIdKarma?id=${id}`);
  return response.data;
};
export const getLikeById = async (id: number) => {
  const response = await $api.get(`PresetSetting/getByIdLike?id=${id}`);
  console.log(response.data);
  return response.data;
};
export const getPostingById = async (id: number) => {
  const response = await $api.get(`PresetSetting/getByIdPosting?id=${id}`);
  console.log(response);
  return response.data;
};
export const presetDelete = async (id: number) => {
  const response = await $api.delete(`PresetSetting/delete?id=${id}`);
  return id;
};
export const updatePresetKarma = async (dto: ICreateKarmaDto) => {
  const response = await $api.put(`PresetSetting/updateKarma`, dto);
};
export const updatePresetPosting = async (dto: ICreateTemplateDto) => {
  const response = await $api.put(`PresetSetting/updatePosting`, dto);
};
export const updatePresetLike = async (dto: ICreateApvoutDto) => {
  const response = await $api.put(`PresetSetting/updateLike`, dto);
};
