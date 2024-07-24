import { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, foodList, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const navigate = useNavigate();

  const placeOrder = async (event) => {
    event.preventDefault();

    // Filter items with non-zero quantity
    const orderItems = foodList
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({ ...item, quantity: cartItems[item._id] }));

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 5,
      paymentMethod,
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (paymentMethod === "cash") {
        navigate("/myorders");
      } else {
        const { session_url } = response.data;
        window.location.replace(session_url);
      }
    } catch (error) {
      alert("Error placing order. Please try again.");
      console.error("Error placing order:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, navigate, getTotalCartAmount]);

  return (
    <form
      className='place-order'
      onSubmit={placeOrder}>
      <div className='place-order-left'>
        <p className='title'>Delivery Info</p>
        <div className='multi-fields'>
          <input
            required
            name='firstName'
            onChange={onChangeHandler}
            value={data.firstName}
            type='text'
            placeholder='Enter first name'
            autoComplete='on'
          />
          <input
            required
            name='lastName'
            onChange={onChangeHandler}
            value={data.lastName}
            type='text'
            placeholder='Enter last name'
            autoComplete='on'
          />
        </div>
        <input
          required
          name='email'
          onChange={onChangeHandler}
          value={data.email}
          type='email'
          placeholder='Enter email address'
          autoComplete='on'
        />
        <input
          required
          name='street'
          onChange={onChangeHandler}
          value={data.street}
          type='text'
          placeholder='Enter street'
          autoComplete='on'
        />
        <div className='multi-fields'>
          <input
            required
            name='city'
            onChange={onChangeHandler}
            value={data.city}
            type='text'
            placeholder='Enter city'
            autoComplete='on'
          />
          <input
            required
            name='state'
            onChange={onChangeHandler}
            value={data.state}
            type='text'
            placeholder='Enter state'
            autoComplete='on'
          />
        </div>
        <div className='multi-fields'>
          <input
            required
            name='zipcode'
            onChange={onChangeHandler}
            value={data.zipcode}
            type='text'
            placeholder='Enter zip code'
            autoComplete='on'
          />
          <input
            required
            name='country'
            onChange={onChangeHandler}
            value={data.country}
            type='text'
            placeholder='Enter country'
            autoComplete='on'
          />
        </div>
        <input
          required
          name='phone'
          onChange={onChangeHandler}
          value={data.phone}
          type='text'
          placeholder='Enter phone number'
          autoComplete='on'
        />
      </div>

      <div className='place-order-right'>
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
              <p>Rs.{getTotalCartAmount() === 0 ? 0 : 5}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Total</p>
              <p>
                Rs.{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}
              </p>
            </div>
          </div>

          <div className='payment-method'>
            <h2>Choose Payment Method:</h2>
            <label>
              <input
                type='radio'
                name='paymentMethod'
                value='cash'
                checked={paymentMethod === "cash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>
            <label>
              <input
                type='radio'
                name='paymentMethod'
                value='stripe'
                checked={paymentMethod === "stripe"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Stripe
            </label>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
