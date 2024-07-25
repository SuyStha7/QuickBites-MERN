import React from "react";
import "./FeedBack.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { reviews } from "../../data";

const FeedBack = () => {
  const renderStars = (rating) => {
    const totalStars = 5;
    return (
      <div className='star-rating'>
        {[...Array(totalStars)].map((star, index) => {
          index += 1;
          return (
            <span
              key={index}
              className={index <= rating ? "filled-star" : "empty-star"}>
              &#9733;
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className='feedback'
      id='feedback'>
      <h2>Customer Feedback</h2>
      <Swiper
        spaceBetween={30}
        slidesPerView={2}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}>
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className='feedback-card'>
              <div>
                <img
                  src={review.image}
                  alt={`${review.name}`}
                  className='review-image'
                />
                <h3>{review.name}</h3>
                {renderStars(review.rating)}
              </div>
              <div className='review'>
                <p>"{review.review}"</p>
              </div>
              <div className='date-address'>
                <p>{review.address}</p>
                <p>{review.dateAdded}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeedBack;
