import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Switch,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./styles.scss";
import { useEffect, useState } from "react";
import { getTags } from "../../service/getTags";
import { getCitys } from "../../service/getCitys";
import { getCookie } from "../../helpers/cookie";
import { createNewJob } from "../../service/createNewJob";
import { useDispatch } from "react-redux";
import { loadPage } from "../../actions/reloadAction";
function CreateNewJob() {
  const dispatch = useDispatch();
  const idCompany = getCookie("idCompany");
  const [option, setOption] = useState([]);
  const [city, setCity] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Thêm việc làm mới thành công",
    });
  };
  useEffect(() => {
    getTags().then((data) => {
      setOption(data);
    });

    getCitys().then((data) => {
      setCity(data);
    });
  }, []);

  const rule = [
    {
      required: true,
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFinish = async (data) => {
    const respone = await createNewJob(idCompany, data);
    if (respone) {
      setIsModalOpen(false);
      success();
      dispatch(loadPage());
      form.resetFields();
    }
  };
  return (
    <>
      {contextHolder}
      <Button className="btn" icon={<PlusOutlined />} onClick={showModal}>
        Tạo việc mới
      </Button>

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
    </>
  );
}

export default CreateNewJob;
