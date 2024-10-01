import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import "./styles.scss";
import { getCookie } from "../../helpers/cookie";
import { getInfoCompany } from "../../service/getInfoCompany";
import { patch } from "../../until/request";

function RegisInfo() {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Cập nhập thành công!",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Cập nhập thất bại!",
    });
  };
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [data, setDataCompany] = useState({});
  const idCompany = getCookie("idCompany");
  const [form] = Form.useForm();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchApi = async () => {
    const response = await getInfoCompany(idCompany);
    setDataCompany(response[0]);
  };

  useEffect(() => {
    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idCompany]);

  const handleClick = () => {
    setComponentDisabled(!componentDisabled);
  };

  // useEffect để set dữ liệu vào form khi data thay đổi
  useEffect(() => {
    // Kiểm tra xem data có dữ liệu không
    if (Object.keys(data).length > 0) {
      form.setFieldsValue(data); // Đổ dữ liệu từ data vào form
    }
  }, [data, form]);

  const handleSave = async (values) => {
    const respone = await patch("/companies", idCompany, values);
    if (respone) {
      setComponentDisabled(!componentDisabled);
      success();
    } else {
      error();
    }
  };

  return (
    <>
      {contextHolder}
      <div className="register">
        <div className="title">
          <h3>Thông tin công ty</h3>
          <Button icon={<EditOutlined />} onClick={handleClick}>
            Chỉnh sửa
          </Button>
        </div>
        <Form form={form} disabled={componentDisabled} onFinish={handleSave}>
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Form.Item
                label="Tên công ty"
                name="companyName"
                rules={[
                  { required: true, message: "Vui lòng nhập tên công ty" },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[20, 20]}>
            <Col span={8}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Vui lòng nhập đúng định dạng email",
                  },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Số điện thoại:"
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại" },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Địa chỉ:"
                name="address"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[20, 20]}>
            <Col span={8}>
              <Form.Item
                label="Số lượng nhân viên"
                name="quantityPeople"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số lượng nhân viên",
                  },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Thời gian làm việc"
                name="workingTime"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập thời gian làm việc",
                  },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Link website"
                name="website"
                rules={[
                  { required: true, message: "Vui lòng nhập link website" },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Form.Item
                label="Đường dẫn ảnh công ty"
                name="thumbnail"
                rules={[{ required: true, message: "Nhập đường dẫn ảnh!" }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input></Input>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Form.Item
                label="Đường dẫn logo"
                name="logo"
                rules={[{ required: true, message: "Nhập đường dẫn ảnh!" }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input></Input>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Form.Item
                label="Mô tả ngắn"
                name="description"
                rules={[
                  { required: true, message: "Vui lòng nhập mô tả ngắn" },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input.TextArea
                  style={{ height: "100px" }}
                  disabled={componentDisabled}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Form.Item
                label="Mô tả chi tiết"
                name="detail"
                rules={[
                  { required: true, message: "Vui lòng nhập mô tả chi tiết" },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input.TextArea
                  style={{ height: "200px" }}
                  disabled={componentDisabled}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default RegisInfo;
