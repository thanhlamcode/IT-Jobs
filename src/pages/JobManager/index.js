import { useState } from "react";
import CreateNewJob from "../../components/CreateNewJob";
import TableJob from "../../components/TableJob";
import "./styles.scss";
function JobManager() {
  const [isLoad, setLoad] = useState(false);
  return (
    <>
      <div className="job-manager">
        <h3>Danh sách việc làm</h3>
        <CreateNewJob isLoad={isLoad} setLoad={setLoad} />
        <div className="table-job">
          <TableJob isLoad={isLoad} setLoad={setLoad} />
        </div>
      </div>
    </>
  );
}

export default JobManager;
