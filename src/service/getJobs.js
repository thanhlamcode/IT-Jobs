import { get } from "../until/request";

export const getJobs = async () => {
  const result = await get("/jobs");
  return result;
};

export const getJobsOnIdCompany = async (id) => {
  const result = await get(`/jobs?idCompany=${id}`);
  return result;
};
