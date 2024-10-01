export const getJob = (dataJob) => {
  return {
    type: "GET_JOB",
    dataJob: dataJob,
  };
};
