import { Button, Checkbox, Form, Input, message } from "antd";
import "./styles.scss";
import { checkLogin } from "../../service/checkLogin";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../helpers/cookie";

function Login() {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Đăng nhập thành công!",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Email hoặc mật khẩu sai!",
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    const result = await checkLogin(e.email, e.password);
    if (result.length > 0) {
      console.log(result);
      success();
      setCookie("companyName", result[0].companyName, 7);
      setCookie("idCompany", result[0].id, 7);
      setCookie("token", result[0].token, 7);
      setTimeout(() => {
        navigate("/admin/overview");
      }, 1000);
    } else {
      error();
    }
  };

  return (
    <>
      {contextHolder}
      <div className="login">
        <h1>Đăng Nhập</h1>
        <Form
          onFinish={handleSubmit}
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          style={{
            maxWidth: 900,
          }}
          initialValues={{
            remember: true,
          }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
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
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 4,
              span: 20,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 20,
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

export default Login;
