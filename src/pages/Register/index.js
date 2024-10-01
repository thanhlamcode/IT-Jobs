import { Button, Form, Input, InputNumber, message } from "antd";
import "./styles.scss";
import { get, post } from "../../until/request";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { generateToken } from "../../helpers/generateToken";
function Register() {
  const [messageApi, contextHolder] = message.useMessage();
  const [messageSameEmail, contextHolderSameEmail] = message.useMessage();
  const [messageSamePhone, contextHolderSamePhone] = message.useMessage();
  const formRef = useRef();
  const navigate = useNavigate();
  const key = "updatable";
  const openMessage = () => {
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: "success",
        content: "Đăng ký thành công",
        duration: 4,
      });
    }, 1000);
  };

  const sameEmail = () => {
    messageSameEmail.open({
      key,
      type: "error",
      content: "Email đã tồn tại!",
      duration: 4,
    });
  };

  const SamePhone = () => {
    messageSamePhone.open({
      key,
      type: "error",
      content: "Số điện thoại đã tồn tại!",
      duration: 4,
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };

  const handleSubmit = async (e) => {
    console.log(e);
    const data = {
      ...e,
      token: generateToken(),
    };

    console.log(data);

    const checkEmail = await get(`/companies?email=${e.email}`);
    const checkPhone = await get(`/companies?phone=${e.phone}`);

    if (checkEmail.length !== 0) {
      sameEmail();
    }
    if (checkPhone.length !== 0) {
      SamePhone();
    }

    if (checkEmail.length === 0 && checkPhone.length === 0) {
      const response = await post("/companies", data);
      if (response) {
        await openMessage();
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    }
  };

  return (
    <>
      {contextHolder}
      {contextHolderSameEmail}
      {contextHolderSamePhone}
      <div className="register">
        <h1>Đăng ký</h1>
        <Form
          ref={formRef}
          {...formItemLayout}
          style={{
            maxWidth: 600,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Tên công ty"
            name="companyName"
            rules={[
              {
                required: true,
                message: "Vui lòng điền tên công ty!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                message: "Vui lòng điền số điện thoại",
              },
            ]}
          >
            <Input
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Logo"
            name="logo"
            rules={[
              {
                required: true,
                message: "Đường dẫn ảnh logo",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ảnh công ty"
            name="thumbnail"
            rules={[
              {
                required: true,
                message: "Đường dẫn ảnh công ty!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              {
                required: true,
                message: "Vui lòng điền địa chỉ công ty!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Thời gian làm việc"
            name="workingTime"
            rules={[
              {
                required: true,
                // message: "Vui lòng điền địa chỉ công ty!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Website"
            name="website"
            rules={[
              {
                required: true,
                message: "Vui lòng điền địa chỉ website công ty!",
              },
            ]}
          >
            <Input addonBefore="http://" addonAfter=".com" />
          </Form.Item>

          <Form.Item
            label="Số lượng nhân viên"
            name="quantityPeople"
            rules={[
              {
                required: true,
                message: "Vui lòng điền số lượng nhân viên!",
              },
            ]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            ></InputNumber>
          </Form.Item>

          <Form.Item
            label="Mô tả ngắn gọn"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mô tả chi tiết"
            name="detail"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input.TextArea
              style={{
                height: "80px",
              }}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Register;
