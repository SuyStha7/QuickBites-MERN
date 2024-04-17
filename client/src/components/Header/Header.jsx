import React from "react";
import './Header.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {Autoplay, Navigation } from "swiper/modules";

const HomeBanner = () => {
  return (
    <>
        <div className="homeBannerSection">
          <Swiper
            slidesPerView={1}
            spaceBetween={15}
            navigation={true}
            loop={false}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
          >

            <SwiperSlide>
              <div className="item">
                <img
                  src="https://orgass.myshopify.com/cdn/shop/files/slider-1.jpg?v=1641277090"
                  alt=""
                />
              </div>
              <div className="sliderInfo1">
                <h2>Welcome to Opencart Delivery!</h2>
                <p>
                  Opencart Delivery is your one-stop destination for convenient, reliable food delivery services. Whether you're craving a comforting home-cooked meal, gourmet cuisine, or your favorite local delights, we've got you covered</p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="item">
                <img
                  src="https://orgass.myshopify.com/cdn/shop/files/slider-2.jpg?v=1642761479"
                  alt=""
                />
              </div>
              <div className="sliderInfo2">
                <h2>Order Now and Enjoy the Convenience</h2>
                <p>Ready to elevate your dining experience with Opencart Delivery? Simply browse our selection, place your order, and let us take care of the rest. With easy online ordering and prompt delivery, satisfaction is just a click away</p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="sliderInfo3">
                <h2>Fast, Efficient Service</h2>
                <p>Hungry for convenience? Opencart Delivery has you covered. With our streamlined ordering process and speedy delivery, you can enjoy your favorite meals without the hassle</p>
              </div>
              <div className="item">
                <img
                  src="https://orgass.myshopify.com/cdn/shop/files/slider-3.jpg?v=1642761510"
                  alt=""
                />
              </div>

            </SwiperSlide>
            
          </Swiper>
        </div>
    </>
  );
};

export default HomeBanner;
