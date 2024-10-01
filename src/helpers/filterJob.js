export const filterJob = (data) => {
  // Sử dụng Set để lọc ra các giá trị job duy nhất
  const uniqueJobsSet = new Set(data.map((item) => item.job));

  // Chuyển đổi Set thành mảng và format lại thành đối tượng { text: job, value: job }
  const uniqueJobs = [...uniqueJobsSet].map((job) => ({
    text: job,
    value: job,
  }));

  console.log(uniqueJobs);
  return uniqueJobs;
};
