import {
  Button,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  message,
} from "antd";
import { TinyColor } from "@ctrl/tinycolor";
import { useEffect, useRef, useState } from "react";
import { getCitys } from "../../service/getCitys";
import { post } from "../../until/request";
function ModalForm(props) {
  const formRef = useRef(null);
  const key = "updatable";
  const { dataJob } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const openMessage = () => {
    messageApi.open({
      key,
      type: "loading",
      content: "Đang cập nhập...",
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: "success",
        content: "Bạn đã đăng ký ứng tuyển thành công",
        duration: 3,
      });
    }, 1000);
  };
  const colors3 = ["#40e495", "#30dd8a", "#2bb673"];
  const getHoverColors = (colors) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());
  const [modal2Open, setModal2Open] = useState(false);
  const formItemLayout = {
    labelCol: {
      md: {
        span: 7,
      },
      sm: {
        span: 24,
      },
    },
    wrapperCol: {
      md: {
        span: 17,
      },
      sm: {
        span: 24,
      },
    },
  };

  const [dataCity, setDataCity] = useState([]);
  useEffect(() => {
    getCitys().then((data) => {
      setDataCity(data);
    });
  }, []);
  const handleSubmit = async (e) => {
    console.log(e);

    // Lấy ngày giờ hiện tại
    const currentDate = new Date();

    // Lấy các thành phần ngày, tháng, năm, giờ, phút, giây từ ngày hiện tại
    const day = currentDate.getDate().toString().padStart(2, "0"); // Ngày (được format 2 chữ số)
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Tháng (được format 2 chữ số, tháng bắt đầu từ 0)
    const year = currentDate.getFullYear(); // Năm
    const hours = currentDate.getHours().toString().padStart(2, "0"); // Giờ (được format 2 chữ số)
    const minutes = currentDate.getMinutes().toString().padStart(2, "0"); // Phút (được format 2 chữ số)
    const seconds = currentDate.getSeconds().toString().padStart(2, "0"); // Giây (được format 2 chữ số)
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    const data = {
      ...e,
      idCompany: dataJob.dataJob.idCompany,
      idJob: dataJob.dataJob.id,
      statusRead: false,
      createAt: formattedDate, // Gán chuỗi ngày giờ đã định dạng vào createAt
    };

    const respone = await post("/cvs", data);

    if (respone) {
      openMessage();
      setTimeout(() => {
        formRef.current.resetFields();
      }, 1000);
    }
    setModal2Open(false);
    console.log(data);
  };

  return (
    <>
      {contextHolder}
      <div className="form">
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: `linear-gradient(116deg,  ${colors3.join(", ")})`,
                colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(
                  colors3
                ).join(", ")})`,
                colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(
                  colors3
                ).join(", ")})`,
                lineWidth: 0,
              },
            },
          }}
        >
          <Button type="primary" onClick={() => setModal2Open(true)}>
            ỨNG TUYỂN NGAY
          </Button>
        </ConfigProvider>

        <Modal
          title="Điền Thông Tin Ứng Viên"
          centered
          open={modal2Open}
          onOk={() => setModal2Open(false)}
          onCancel={() => setModal2Open(false)}
          footer={null}
        >
          <Form
            ref={formRef}
            {...formItemLayout}
            style={{
              maxWidth: 600,
            }}
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Họ tên ứng viên:"
              name="name"
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
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền số điện thoại",
                },
              ]}
            >
              <InputNumber
                style={{
                  width: "100%",
                }}
                maxLength={10}
              />
            </Form.Item>

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
              label="Mô tả về bản thân:"
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
              label="Link project:"
              name="linkProject"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền địa địa chỉ projects",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Nơi sinh sống:"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn 1 thành phố sinh sống và làm việc!",
                },
              ]}
            >
              <Select options={dataCity} allowClear></Select>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 20,
                span: 1,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default ModalForm;
