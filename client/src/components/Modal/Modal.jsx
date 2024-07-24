import React from "react";
import "./Modal.css";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const Modal = ({ show, onClose, children, price, rating }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          {children}
          <div className="modal-price-rating">
            <div className="modal-price">
              <p>Rs.{price}</p>
            </div>
            <div className="modal-rating">
              <StarRating rating={rating} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// StarRating Component
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 !== 0 ? 1 : 0;

  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} color="#ffd700" />
      ))}
      {halfStars === 1 && <FaStarHalfAlt color="#ffd700" />}
    </div>
  );
};

export default Modal;
