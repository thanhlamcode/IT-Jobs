import { getCompany } from "../service/getCompany";
import { getJobs } from "../service/getJobs";

export const searchFunction = async (inputSearch) => {
  console.log(inputSearch);
  const response = await getJobs();
  console.log(response);

  const filter1 = response.filter((element) =>
    element.tags.some((tag) => inputSearch.language.includes(tag))
  );
  const filter2 = filter1.filter((element) =>
    element.city.includes(inputSearch.city)
  );
  console.log(filter1);
  console.log(filter2);

  return filter2;
};

export const filterLanguage = async (inputSearch) => {
  const response = await getJobs();
  const filter = response.filter((element) =>
    element.tags.some((tag) => inputSearch.language.includes(tag))
  );
  console.log(filter);
  return filter;
};

export const filterData = async (dataJobs) => {
  if (!Array.isArray(dataJobs)) {
    console.error("dataJobs is not an array:", dataJobs);
    return;
  }

  try {
    // Lấy dữ liệu từ getCompany
    const dataCompany = await getCompany();

    // Lọc và khớp thông tin từ dataCompany vào dataJobs
    const filteredData = dataJobs.map((jobItem) => {
      const company = dataCompany.find((item) => item.id === jobItem.idCompany);
      return {
        ...jobItem,
        company: company || null, // Nếu không tìm thấy company, trả về null
      };
    });

    // console.log(filteredData);
    return filteredData;
  } catch (error) {
    console.error("Error filtering data:", error);
    throw error; // Ném lỗi để xử lý bên ngoài
  }
};
