import { Col, Row } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.scss";

function Slider(props) {
  const { dataCompa } = props;
  console.log(dataCompa);
  return (
    <>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Keyboard, Pagination, Navigation]}
        className="slider-2"
      >
        {dataCompa.map((item) => (
          <>
            <SwiperSlide>
              <div className="wrap-img">
                <img alt="Ảnh công ty" src={item.thumbnail}></img>
              </div>
              <div className="wrap-content">
                <Row>
                  <Col span={8}>
                    <div className="wrap-content__img">
                      <img alt="logo" src={item.logo}></img>
                    </div>
                  </Col>
                  <Col span={16}>
                    <h3>{item.companyName}</h3>
                    <h4>{item.description}</h4>
                    <p>{item.detail}</p>
                  </Col>
                </Row>
              </div>
            </SwiperSlide>
          </>
        ))}
      </Swiper>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="slider"
      >
        {dataCompa.map((item) => (
          <>
            <SwiperSlide>
              <div className="wrap-img">
                <img alt="Ảnh công ty" src={item.thumbnail}></img>
              </div>
              <div className="wrap-content">
                <Row>
                  <Col span={8}>
                    <div className="wrap-content__img">
                      <img alt="logo" src={item.logo}></img>
                    </div>
                  </Col>
                  <Col span={16}>
                    <h3>{item.companyName}</h3>
                    <h4>{item.description}</h4>
                    <p>{item.detail}</p>
                  </Col>
                </Row>
              </div>
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </>
  );
}

export default Slider;
