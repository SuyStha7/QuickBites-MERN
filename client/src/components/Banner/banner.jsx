import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./banner.css";

const Banner = () => {
  return (
    <>
      <div className="banner">
        <Swiper
          slidesPerView={1}
          loop={false}
          pagination={{
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide id="slide1" className="slide">
            <div className="slide-info">
              <h2 className="slide-info-heading">Welcome to QuickBite !</h2>
              <p className="slide-info-content">
                QuickBite is your one-stop destination for convenient, reliable
                food delivery services. Whether you're craving a comforting
                home-cooked meal, gourmet cuisine, or your favorite local
                delights, we've got you covered.
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide id="slide2" className="slide">
            <div className="slide-info">
              <h2 className="slide-info-heading">
                Order Now and Enjoy the Convenience
              </h2>
              <p className="slide-info-content">
                Ready to elevate your dining experience with QuickBite Delivery?
                Simply browse our selection, place your order, and let us take
                care of the rest. With easy online ordering and prompt delivery,
                satisfaction is just a click away.
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide id="slide3" className="slide">
            <div className="slide-info">
              <h2 className="slide-info-heading">Fast, Efficient Service</h2>
              <p className="slide-info-content">
                Hungry for convenience? QuickBite Delivery has you covered. With
                our streamlined ordering process and speedy delivery, you can
                enjoy your favorite meals without the hassle
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Banner;
