import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const {
    foodList,
    cartItems,
    removeFromCart,
    addToCart,
    getTotalCartAmount,
    url,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const handleAddToCart = (id) => {
    addToCart(id);
    toast.success("Item added to cart!", { autoClose: 1000 });
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
    toast.success("Item removed from cart!", { autoClose: 1000 });
  };

  const isCartEmpty = getTotalCartAmount() === 0;

  return (
    <div className='cart'>
      {isCartEmpty ? (
        <div className='empty-cart'>
          <h2>Your cart is empty</h2>
          <p>It looks like you have no items in your cart. Go back to the menu and add some items!</p>
        </div>
      ) : (
        <>
          <div className='cart-items'>
            <div className='cart-items-title'>
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Actions</p>
            </div>
            <br />
            <hr />
            {foodList.map((item, index) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={index}>
                    <div className='cart-items-title cart-items-item'>
                      <img
                        src={url + "/images/" + item.image}
                        alt={item.name}
                      />
                      <p>{item.name}</p>
                      <p>Rs.{item.price}</p>
                      <p>{cartItems[item._id]}</p>
                      <p>Rs.{item.price * cartItems[item._id]}</p>
                      <div className='action'>
                        <img
                          src={assets.remove_icon_red}
                          onClick={() => handleRemoveFromCart(item._id)}
                          alt='Remove from cart'
                        />
                        <img
                          src={assets.add_icon_green}
                          onClick={() => handleAddToCart(item._id)}
                          alt='Add to cart'
                        />
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              }
            })}
          </div>

          <div className='cart-bottom'>
            <div className='cart-total'>
              <h2>Cart Total</h2>
              <div>
                <div className='cart-total-details'>
                  <p>Subtotal</p>
                  <p>Rs.{getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className='cart-total-details'>
                  <p>Delivery Fee</p>
                  <p>Rs.{isCartEmpty ? 0 : 5}</p>
                </div>
                <hr />
                <div className='cart-total-details'>
                  <p>Total</p>
                  <p>Rs.{isCartEmpty ? 0 : getTotalCartAmount() + 5}</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/order")}
                disabled={isCartEmpty}>
                PROCEED TO CHECKOUT
              </button>
            </div>

            <div className='cart-promocode'>
              <div>
                <p>If you have a promo code, enter it here:</p>
                <div className='cart-promocode-input'>
                  <input
                    type='text'
                    placeholder='promo code'
                  />
                  <button>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
