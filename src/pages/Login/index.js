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
      <div className="login-container">
        <div className="login-box">
          <h1>ĐĂNG NHẬP</h1>
          <Form
            onFinish={handleSubmit}
            name="basic"
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="submit-btn">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
