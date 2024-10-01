import { get } from "../until/request";

export const getCompany = async () => {
  const result = await get("/companies");
  return result;
};
