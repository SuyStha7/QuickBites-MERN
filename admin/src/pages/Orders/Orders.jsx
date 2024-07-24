import { useState, useEffect } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD"); // Default payment method

  // Fetch orders with optional payment method filtering
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`, {
        params: { paymentMethod }, // Send payment method as a query parameter
      });
      setOrders(response.data.data);
    } catch (error) {
      toast.error("Error fetching orders: " + error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders(); // Fetch orders when component mounts or payment method changes
  }, [paymentMethod]); // Dependency array includes paymentMethod

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
        paymentMethod, // Include payment method in the update request
      });
      if (response.data.success) {
        await fetchAllOrders(); // Refresh the order list
      }
    } catch (error) {
      toast.error("Error updating order status: " + error.message);
    }
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value); // Update the payment method and trigger a fetch
  };

  return (
    <div className='order add'>
      <h2>Orders</h2>
      <div className='payment-method'>
        <label htmlFor='payment-method'>Payment Method:</label>
        <select
          id='payment-method'
          onChange={handlePaymentMethodChange}
          value={paymentMethod}>
          <option value='COD'>COD</option>
          <option value='Stripe'>Stripe</option>
        </select>
      </div>
      <div className='order-list'>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              key={index}
              className='order-item'>
              <img
                src={assets.parcel_icon}
                alt='Order Icon'
              />

              <div>
                <p className='order-item-food'>
                  {order.items.map((item, index) => {
                    return (
                      item.name +
                      " x " +
                      item.quantity +
                      (index < order.items.length - 1 ? ", " : "")
                    );
                  })}
                </p>

                <p className='order-item-name'>
                  {order.address.firstName + " " + order.address.lastName}
                </p>

                <div className='order-item-address'>
                  <p>{order.address.street + ","}</p>
                  <p>
                    {order.address.city +
                      ", " +
                      order.address.state +
                      ", " +
                      order.address.country +
                      ", " +
                      order.address.zipcode}
                  </p>
                </div>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>Rs.{order.amount}</p>

              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}>
                <option value='Food Processing'>Food Processing</option>
                <option value='Out for delivery'>Out for delivery</option>
                <option value='Delivered'>Delivered</option>
              </select>
            </div>
          ))
        ) : (
          <p>No orders available for the selected payment method.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
