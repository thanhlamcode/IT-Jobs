import { Button, Layout, Modal } from "antd";
import Sider from "antd/es/layout/Sider";
import {
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Content, Footer } from "antd/es/layout/layout";
import "./styles.scss";
import MenuSideBar from "../../components/MenuSideBar";
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { deleteCookie } from "../../helpers/cookie";
function LayoutAdmin() {
  const [collapsed, setCollapsed] = useState(false);
  const { confirm } = Modal;
  const navigate = useNavigate();
  const showPromiseConfirm = () => {
    confirm({
      title: "Bạn có muốn đăng xuất không?",
      icon: <LogoutOutlined />,
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          setTimeout(() => {
            deleteCookie("token");
            navigate("/");
          }, 1000);
        }).catch(() => console.log("Oops errors!"));
      },
      onCancel() {},
    });
  };

  return (
    <>
      <div className="admin">
        <Layout>
          <header className="header-admin">
            <div
              className={`header-left header-left${
                collapsed ? "--collapse" : ""
              }`}
            >
              <NavLink to="/admin/overview">IT Admin</NavLink>
            </div>
            <div className="header-right">
              <div className="collapse">
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
              </div>
              <div className="btn">
                <Button icon={<HomeOutlined />}>
                  <NavLink to="/">Trang chủ</NavLink>
                </Button>
                <Button onClick={showPromiseConfirm} icon={<LogoutOutlined />}>
                  Đăng xuất
                </Button>
              </div>
            </div>
          </header>
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              theme="light"
              style={{
                background: "#F5F5F5",
              }}
            >
              <div className={`menu${collapsed ? "--collapse" : ""}`}>
                <MenuSideBar />
              </div>
            </Sider>
            <Content className="content">
              <Outlet />
            </Content>
          </Layout>
          <Footer className="footer" theme="light">
            Copyright @ 2024 TopDev
          </Footer>
        </Layout>
      </div>
    </>
  );
}

export default LayoutAdmin;
