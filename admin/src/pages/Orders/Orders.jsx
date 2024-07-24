import { useState, useEffect } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { IoMdRemoveCircleOutline } from "react-icons/io";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async (token) => {
    try {
      const response = await axios.get(`${url}/api/order/list`, {
        headers: { token },
      });
      setOrders(response.data.data);
    } catch (error) {
      toast.error("Error fetching orders: " + error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders(); // Refresh the order list
      }
    } catch (error) {
      toast.error("Error updating order status: " + error.message);
    }
  };

  const removeOrderHandler = async (orderId) => {
    try {
      const response = await axios.delete(`${url}/api/order/remove/${orderId}`);
      if (response.data.success) {
        await fetchAllOrders(); // Refresh the order list
        toast.success("Order removed successfully", {autoClose: 1000});
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error removing order: " + error.message, {autoClose: 1000});
    }
  };

  return (
    <div className='order add'>
      <h3>Orders</h3>
      <div className='order-list'>
        {orders.map((order, index) => (
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
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
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

            <div
              onClick={() => removeOrderHandler(order._id)}
              className='remove-btn'>
              <IoMdRemoveCircleOutline />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
