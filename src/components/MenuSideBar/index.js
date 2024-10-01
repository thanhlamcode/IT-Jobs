import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  CameraOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
function MenuSideBar() {
  const items = [
    {
      key: "1",
      label: <Link to="overview">Tổng quan</Link>,
      icon: <MailOutlined />,
    },
    {
      key: "2",
      label: <Link to="regisinfo"> Thông tin đăng ký</Link>,
      icon: <AppstoreOutlined />,
    },
    {
      key: "3",
      label: <Link to="jobmanager"> Quản lý việc làm</Link>,
      icon: <CarryOutOutlined />,
    },
    {
      key: "4",
      label: <Link to="cvmanager"> Quản lý CV</Link>,
      icon: <CameraOutlined />,
    },
  ];
  return (
    <>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    </>
  );
}

export default MenuSideBar;
