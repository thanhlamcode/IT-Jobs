import { get } from "../until/request";

export const getDataCV = async () => {
  const dataCV = await get("/cvs");
  const dataJob = await get("/jobs");
  //   console.log(dataCV, dataJob);

  // Tạo một đối tượng mapping các idJob với tên công việc từ dataJob
  const jobMap = {};
  dataJob.forEach((item) => {
    jobMap[item.id] = item.name;
  });

  // Tạo mảng kết quả bằng cách kết hợp thông tin từ dataCV và tên công việc từ jobMap
  const result = dataCV.map((itemCV) => ({
    ...itemCV,
    job: jobMap[itemCV.idJob] || "Unknown Job", // Nếu không tìm thấy idJob trong jobMap
  }));
  //   console.log(result);
  return result;
};
