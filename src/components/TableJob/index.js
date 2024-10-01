import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { getJobsOnIdCompany } from "../../service/getJobs";
import { getCookie } from "../../helpers/cookie";
import { DeleteOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../../service/getTags";
import { useForm } from "antd/es/form/Form";
import { getCitys } from "../../service/getCitys";
import { deleteApi, patch } from "../../until/request";
import { loadPage } from "../../actions/reloadAction";
function TableJob() {
  const loading = useSelector((state) => state.reloadReducer);
  const dispatch = useDispatch();
  const [option, setOption] = useState([]);
  const [city, setCity] = useState([]);
  const [idJob, setIdJob] = useState();
  const [top, setTop] = useState("topCenter");
  const [bottom, setBottom] = useState("bottomCenter");
  const idCompany = getCookie("idCompany");
  const [dataJob, setDataJob] = useState([]);
  const [dataTag, setTag] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [detailData, setDeTailData] = useState([]);
  const [form] = useForm();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Cập nhập thành công!",
    });
  };
  const deleteJob = () => {
    messageApi.open({
      type: "success",
      content: "Xóa công việc thành công!",
    });
  };
  const handleFinish = async (e) => {
    console.log(e);
    const data = {
      ...e,
      idCompany: parseInt(idCompany),
    };
    const respone = await patch("/jobs", idJob, data);
    console.log(respone);
    if (respone) {
      success();
      setIsModalOpen(false);
      dispatch(loadPage());
    }
  };

  useEffect(() => {
    getTags().then((data) => {
      setOption(data);
    });

    getCitys().then((data) => {
      setCity(data);
    });
  }, []);

  useEffect(() => {
    getJobsOnIdCompany(idCompany).then((data) => {
      setDataJob(data);
    });

    getTags().then((data) => {
      setTag(data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const initTag = [];
  dataTag.forEach((item) =>
    initTag.push({
      text: item.value,
      value: item.value,
    })
  );

  const handleDelete = async (key) => {
    const respone = await deleteApi("/jobs", key);
    console.log(respone);
    if (respone) {
      deleteJob();
      dispatch(loadPage());
    }
  };

  const rule = [
    {
      required: true,
    },
  ];

  const showModal = (id) => {
    setIsModalOpen(true);
    console.log(id);
    const data = dataJob.filter((item) => item.id === id);
    console.log(data[0]);
    setIdJob(data[0].id);
    form.setFieldsValue(data[0]);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setOpenModal(false);
  };

  const handleSeen = (id) => {
    setOpenModal(true);
    console.log(id);
    const data = dataJob.filter((item) => item.id === id);
    setDeTailData(data);
    console.log(data);
  };

  const columns = [
    {
      title: "Tên job",
      dataIndex: "name",
      key: "name",
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag, index) => {
            let color = index % 2 === 0 ? "blue" : "cyan";
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
      filters: initTag,
      onFilter: (value, record) => record.tags.indexOf(value) === 0,
    },
    {
      title: "Mức lương ($)",
      dataIndex: "salary",
      key: "salary",
      sorter: (a, b) => a.salary - b.salary,
    },
    {
      title: "Thời gian",
      key: "createAt",
      dataIndex: "createAt",
      sorter: (a, b) => {
        dataJob.reverse();
        loadPage();
      },
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => (
        <>
          {status !== undefined && (
            <Tag
              color={status ? "green" : "red"}
              style={{
                fontSize: "15px",
              }}
            >
              {status ? "Đang bật" : "Đang tắt"}
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (index, record) => {
        // console.log(record);
        return (
          <>
            <Space direction="vertical">
              <Button
                icon={<EyeOutlined />}
                onClick={() => {
                  handleSeen(record.id);
                }}
              ></Button>
              <Button
                onClick={() => {
                  showModal(record.id);
                }}
                style={{
                  color: "#0080CF",
                }}
                icon={<EditOutlined />}
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

  return (
    <>
      {contextHolder}
      <Radio.Group
        style={{
          marginBottom: 10,
        }}
        value={top}
        onChange={(e) => {
          setTop(e.target.value);
        }}
      />

      <Radio.Group
        style={{
          marginBottom: 10,
        }}
        value={bottom}
        onChange={(e) => {
          setBottom(e.target.value);
        }}
      />
      <Table
        columns={columns}
        dataSource={dataJob.reverse()}
        pagination={{
          position: [bottom],
        }}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
      />

      {/* Modal Edit*/}
      <Modal
        title="Tạo việc làm mới"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleFinish}
          wrapperCol={{
            span: 24,
          }}
          labelCol={{ span: 24 }}
        >
          {/* <Button onClick={onFill}>Onfill</Button> */}
          <Row>
            <Col span={24}>
              <Form.Item label="Tên công việc:" name="name" rules={rule}>
                <Input></Input>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item label="Tags" name="tags" rules={rule}>
                <Select
                  placeholder="Search to Select"
                  mode="multiple"
                  options={option}
                  allowClear
                ></Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                label="Mức lương / tháng (USD)"
                name="salary"
                rules={rule}
              >
                <InputNumber
                  min={0}
                  max={10000}
                  style={{ width: "100%" }}
                  addonAfter="$"
                ></InputNumber>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item label="Mô tả" name="description" rules={rule}>
                <Input.TextArea
                  style={{
                    height: "100px",
                  }}
                ></Input.TextArea>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item label="Thành phố" name="city" rules={rule}>
                <Select
                  placeholder="Search to Select"
                  mode="multiple"
                  options={city}
                  allowClear
                ></Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                label="Trạng thái"
                name="status"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                initialValue={true}
              >
                <Switch defaultChecked />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[10, 10]}>
            <Col span={24}>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Save
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* {Modal Seen} */}

      <Modal
        title="Thông tin chi tiết"
        open={openModal}
        footer={null}
        onCancel={handleCancel}
      >
        {detailData.length > 0 && (
          <Row gutter={20}>
            <Col span={24}>
              <p>
                <strong>Tên công việc:</strong> {detailData[0].name}
              </p>
              <p>
                <strong>Tags:</strong>{" "}
                {detailData[0].tags.map((item) => (
                  <Tag color="volcano">{item}</Tag>
                ))}
              </p>
              <p>
                <strong>Mức lương:</strong> {detailData[0].salary}
              </p>
              <p>
                <strong>Mô tả:</strong> {detailData[0].description}
              </p>
              <p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <strong>Trạng thái:</strong>{" "}
                  {detailData[0].status ? (
                    <p style={{ color: "green", marginLeft: "20px" }}>
                      Đang bật để tuyển dụng
                    </p>
                  ) : (
                    <p style={{ color: "red", marginLeft: "20px" }}>
                      Chưa bật để tuyển dụng
                    </p>
                  )}
                </div>
              </p>
              <p>
                <strong>Thành phố:</strong>{" "}
                {detailData[0].city.map((item) => (
                  <Tag color="cyan">{item}</Tag>
                ))}
              </p>
              <p>
                <strong>Tạo vào lúc:</strong> {detailData[0].createAt}
              </p>
            </Col>
          </Row>
        )}
      </Modal>
    </>
  );
}

export default TableJob;
