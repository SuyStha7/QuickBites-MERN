import { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import Modal from "../Modal/Modal";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { toast } from "react-toastify";

const FoodItem = ({ id, name, price, image, rating = 4.5, description }) => {
  const { cartItems, addToCart, removeFromCart, url, token } = useContext(StoreContext);
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    if (token) {
      addToCart(id);
      toast.success(`${name} added to cart!`, { autoClose: 1000 });
    } else {
      toast.error("Please log in to add items to the cart.", { autoClose: 1000 });
    }
  };

  const handleRemoveFromCart = () => {
    if (token) {
      removeFromCart(id);
      toast.success(`${name} removed from cart!`, { autoClose: 1000 });
    } else {
      toast.error("Please log in to remove items from the cart.", { autoClose: 1000 });
    }
  };

  // Helper function to truncate description
  const truncateDescription = (desc, limit = 10) => {
    const words = desc.split(' ');
    if (words.length <= limit) return desc;
    return words.slice(0, limit).join(' ') + '...';
  };

  return (
    <div className='food-item'>
      <div className='food-item-img-container'>
        <img
          src={`${url}/images/${image}`}
          alt={name}
          className='food-item-image'
        />
        {!cartItems[id] ? (
          <img
            className='add'
            onClick={handleAddToCart}
            src={assets.add_icon_white}
            alt='Add to cart'
          />
        ) : (
          <div className='food-item-counter'>
            <img
              onClick={handleRemoveFromCart}
              src={assets.remove_icon_red}
              alt='Remove from cart'
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={handleAddToCart}
              src={assets.add_icon_green}
              alt='Add more'
            />
          </div>
        )}
        <div className='zoom-icon' onClick={() => setShowModal(true)}>
          <MdOutlineZoomOutMap />
        </div>
      </div>
      <div className='food-item-info'>
        <div className='food-item-name-rating'>
          <p>{name}</p>
          <h6 className='food-item-price'>Rs.{price}</h6>
        </div>
        <p>{truncateDescription(description)}</p>
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        price={price}
        rating={rating}
      >
        <h3>{name}</h3>
        <img
          src={`${url}/images/${image}`}
          alt={name}
          style={{ width: "100%" }}
        />
        <p>{description}</p>
      </Modal>
    </div>
  );
};

export default FoodItem;
