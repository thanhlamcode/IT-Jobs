import { post } from "../until/request";

export const createNewJob = async (idCompany, data) => {
  const currentDate = new Date();

  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

  const dataJob = {
    ...data,
    idCompany: parseInt(idCompany),
    createAt: formattedDate,
  };

  const result = await post("/jobs", dataJob);
  return result;
};
