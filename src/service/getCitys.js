import { get } from "../until/request";

export const getCitys = async () => {
  const result = await get("/cities");
  return result;
};
