import { get } from "../until/request";

export const checkEmail = async (email) => {
  const respone = await get(`/companies?email=${email}`);
  if (respone === undefined) {
    return false;
  } else {
    return true;
  }
};

export const checkPhone = async (phone) => {
  const respone = await get(`/companies?email=${phone}`);
  return respone ? true : false;
};
