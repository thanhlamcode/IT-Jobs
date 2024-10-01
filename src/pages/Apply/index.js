import { Tag } from "antd";
import { useSelector } from "react-redux";
import "./styles.scss";
import ModalForm from "../../components/ModalForm";

function Apply() {
  const dataJob = useSelector((state) => state.jobReducer);
  console.log(dataJob);
  console.log(dataJob.dataJob);
  return (
    <>
      <div className="apply">
        <div>
          <div className="inner-image">
            <img alt="logo" src={dataJob.dataJob.company.logo}></img>
          </div>
          <h1>{dataJob.dataJob.name}</h1>
          <h2>{dataJob.dataJob.company.companyName}</h2>
          <p>
            {" "}
            <strong>Mô tả công việc:</strong> {dataJob.dataJob.description}
          </p>
          <p>
            {" "}
            <strong>Mức lương:</strong> {dataJob.dataJob.salary}{" "}
          </p>
          <p>
            {" "}
            <strong>Địa chỉ làm việc:</strong> {dataJob.dataJob.company.address}
          </p>
          <p>
            {" "}
            <strong>Ngày tạo:</strong> {dataJob.dataJob.createAt}
          </p>
          <p>
            {" "}
            <strong>Thời gian làm việc:</strong>{" "}
            {dataJob.dataJob.company.workingTime}
          </p>
          <p>
            {" "}
            <strong>Công nghệ sử dụng:</strong>
            {dataJob.dataJob.tags.map((item) => (
              <>
                <Tag color="#87d068">{item}</Tag>
              </>
            ))}
          </p>
        </div>
      </div>
      <ModalForm dataJob={dataJob} />
    </>
  );
}

export default Apply;
