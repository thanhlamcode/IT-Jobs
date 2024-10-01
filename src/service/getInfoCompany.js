import { get } from "../until/request";

export const getInfoCompany = async (id) => {
  const respone = await get(`/companies?id=${id}`);
  return respone;
};
