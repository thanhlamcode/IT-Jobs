import { get } from "../until/request";

export const checkLogin = async (email, password) => {
  const respone = await get(`/companies?email=${email}&password=${password}`);
  return respone;
};
