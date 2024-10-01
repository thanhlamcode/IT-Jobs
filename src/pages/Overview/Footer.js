import { Col, Row } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import "./footer.scss";

function Footer() {
  return (
    <>
      <div className="footer">
        <Row gutter={[20, 20]}>
          <Col xxl={6} xl={6} md={12} sm={24} xs={24}>
            <div className="box">
              <h4>Income</h4>
              <div className="inner-box">
                <p>
                  <span className="kitu">$</span>{" "}
                  <span className="number">5,456</span>
                </p>
                <p style={{ color: "green", fontWeight: "700" }}>+14%</p>
              </div>
            </div>
          </Col>
          <Col xxl={6} xl={6} md={12} sm={24} xs={24}>
            <div className="box">
              <h4>Expenses</h4>
              <div className="inner-box">
                <p>
                  <span className="kitu">$</span>{" "}
                  <span
                    className="number"
                    style={{ color: "red", fontWeight: "700" }}
                  >
                    4,764
                  </span>
                </p>
                <p style={{ color: "red", fontWeight: "700" }}>
                  <UpOutlined /> 8%
                </p>
              </div>
            </div>
          </Col>
          <Col xxl={6} xl={6} md={12} sm={24} xs={24}>
            <div className="box">
              <h4>Spendings</h4>
              <div className="inner-box">
                <p>
                  <DownOutlined style={{ color: "green", fontWeight: "700" }} />{" "}
                  <span className="kitu">$</span>{" "}
                  <span className="number">1,5M</span>
                </p>
                <p style={{ color: "green", fontWeight: "700" }}>
                  <DownOutlined /> 15%
                </p>
              </div>
            </div>
          </Col>
          <Col xxl={6} xl={6} md={12} sm={24} xs={24}>
            <div className="box">
              <h4>Totals</h4>
              <div className="inner-box">
                <p>
                  <span className="kitu">$</span>{" "}
                  <span className="number">31,564</span>
                </p>
                <p style={{ color: "green", fontWeight: "700" }}>+76%</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Footer;
