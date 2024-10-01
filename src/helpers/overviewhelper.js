import { get } from "../until/request";

export const countJob = async (id) => {
  const respone = await get(`/jobs?idCompany=${id}`);
  return respone.length;
};

export const countJobStatus = async (id) => {
  const respone = await get(`/jobs?idCompany=${id}&status=true`);
  return respone.length;
};

export const allCV = async (id) => {
  const respone = await get(`/cvs?idCompany=${id}`);
  return respone.length;
};

export const allCVRead = async (id) => {
  const respone = await get(`/cvs?idCompany=${id}&statusRead=true`);
  return respone.length;
};
