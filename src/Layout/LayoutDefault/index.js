import { useState } from "react";
import { Button, Layout, Modal } from "antd";
import "./styles.scss";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../../../src/image/snoopy.webp";
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { deleteCookie, getCookie } from "../../helpers/cookie";

const { Footer, Content } = Layout;

function LayoutDefault() {
  const { confirm } = Modal;
  const [token, setToken] = useState(getCookie("token"));
  const navigate = useNavigate();
  const handleLogout = () => {
    confirm({
      title: "Bạn có muốn đăng xuất không?",
      icon: <LogoutOutlined />,
      onOk() {
        return new Promise((resolve) => {
          setTimeout(() => {
            deleteCookie("token");
            setToken(null);
            navigate("/");
            resolve();
          }, 1000);
        }).catch(() => console.log("Oops errors!"));
      },
      onCancel() {},
    });
  };

  return (
    <>
      <Layout>
        <header className="header">
          <div className="header__left">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="header__right">
            {token ? (
              <>
                <Button icon={<HomeOutlined />}>
                  <NavLink to="/admin/overview">Trang Quản Lý</NavLink>
                </Button>
                <Button onClick={handleLogout} icon={<LogoutOutlined />}>
                  Đăng xuất
                </Button>
              </>
            ) : (
              <>
                <Link to="login">
                  <button className="btn-dn">Đăng nhập</button>
                </Link>
                <Link to="register">
                  <button className="btn-dk">Đăng ký</button>
                </Link>
              </>
            )}
          </div>
        </header>
        <Content>
          <Outlet />
        </Content>
        <Footer className="footer">Copyright @ TopCV 2024</Footer>
      </Layout>
    </>
  );
}

export default LayoutDefault;
