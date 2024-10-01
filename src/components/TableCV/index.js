/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Button,
  Col,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import { getDataCV } from "../../helpers/getDataCV";
import { useEffect, useState } from "react";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteApi, patch } from "../../until/request";
import { loadPage } from "../../actions/reloadAction";
import { filterJob } from "../../helpers/filterJob";
import { getCookie } from "../../helpers/cookie";

function TableCV() {
  const idCompany = getCookie("idCompany");
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const loading = useSelector((state) => state.reloadReducer);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Xóa CV thành công!",
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getDataCV();
        const filter = fetchedData.filter(
          // eslint-disable-next-line eqeqeq
          (item) => item.idCompany == idCompany
        );
        setData(filter);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Xử lý lỗi khi không thể lấy dữ liệu từ API
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  console.log(data);

  const filterdatajob = filterJob(data);

  const handleDelete = (id) => {
    const respone = deleteApi("/cvs", id);
    if (respone) {
      success();
      dispatch(loadPage());
    }
  };

  const handleSeen = (record) => {
    setDataModal(record);
    // console.log(record);
    const data = {
      ...record,
      statusRead: true,
    };
    setOpenModal(true);
    const respone = patch("/cvs", record.id, data);
    if (respone) {
      dispatch(loadPage());
    }
  };
  //   console.log(dataModal);

  const handleCancel = () => {
    setOpenModal(false);
  };

  const columns = [
    {
      title: "Tên job",
      dataIndex: "job",
      key: "job",
      render: (text) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a>{text}</a>
      ),
      filters: filterdatajob,
      onFilter: (value, record) => record.job.indexOf(value) === 0,
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (text) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a>{text}</a>
      ),
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Ngày gửi",
      key: "createAt",
      dataIndex: "createAt",
      render: (text) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a>{text}</a>
      ),
      sorter: (a, b) => {
        data.reverse();
        loadPage();
      },
    },
    {
      title: "Trạng thái",
      key: "statusRead",
      dataIndex: "statusRead",
      render: (_, { statusRead }) => (
        <>
          {statusRead ? (
            <Tag color="green">Đã đọc</Tag>
          ) : (
            <Tag color="red">Chưa đọc</Tag>
          )}
        </>
      ),
    },
    {
      title: "Hành động",
      render: (_, record) => {
        return (
          <>
            <Space direction="vertical">
              <Button
                icon={<EyeOutlined />}
                onClick={() => {
                  handleSeen(record);
                }}
              ></Button>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record.id)}
              >
                <Button
                  icon={<DeleteOutlined />}
                  style={{
                    color: "red",
                  }}
                ></Button>
              </Popconfirm>
            </Space>
          </>
        );
      },
    },
  ];

  const [bottom, setBottom] = useState("bottomCenter");
  return (
    <>
      {contextHolder}
      <Table
        columns={columns}
        dataSource={data.reverse()}
        pagination={{
          position: [bottom],
        }}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
      />
      ;
      <Radio.Group
        style={{
          marginBottom: 10,
        }}
        value={bottom}
        onChange={(e) => {
          setBottom(e.target.value);
        }}
      />
      {/* Modal seen */}
      <Modal
        title="Thông tin CV"
        open={openModal}
        footer={null}
        onCancel={handleCancel}
      >
        <div className="modal-cv">
          {dataModal && (
            <Row gutter={0}>
              <Col span={24}>
                <p>
                  {" "}
                  <strong>Họ và tên ứng viên:</strong> {dataModal.name}
                </p>
              </Col>
              <Col span={24}>
                <p>
                  {" "}
                  <strong>Số điện thoại: </strong> {dataModal.phone}
                </p>
              </Col>
              <Col span={24}>
                <p>
                  {" "}
                  <strong>Email: </strong> {dataModal.email}
                </p>
              </Col>
              <Col span={24}>
                <p>
                  {" "}
                  <strong>Mô tả: </strong>{" "}
                  {dataModal.detail ? dataModal.detail : dataModal.description}
                </p>
              </Col>
              <Col span={24}>
                <p>
                  {" "}
                  <strong>Link project: </strong> <a>{dataModal.linkProject}</a>
                </p>
              </Col>
              <Col span={24}>
                <p>
                  {" "}
                  <strong>Nơi sinh sống hiện tại: </strong>{" "}
                  <a>{dataModal.city}</a>
                </p>
              </Col>
            </Row>
          )}
        </div>
      </Modal>
    </>
  );
}
export default TableCV;
