import { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { FaTrash } from "react-icons/fa"; // Import the trash icon

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      setData(response.data.data);
      toast.info("Tracking order...", { autoClose: 2 });
    } catch (error) {
      toast.error("Error fetching orders: " + error.message, {
        autoClose: 1000,
      });
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  // Remove order
  const removeOrder = async (orderId) => {
    try {
      const response = await axios.delete(`${url}/api/order/${orderId}`, {
        headers: { token },
      });
      if (response.data.success) {
        toast.success("Order removed successfully", { autoClose: 1000 });
        setData(data.filter((order) => order._id !== orderId));
      }
    } catch (error) {
      toast.error("Error removing order: " + error.message, {
        autoClose: 1000,
      });
    }
  };

  return (
    <div className='my-orders'>
      <h2 className='title'>My Orders</h2>
      <div className='container'>
        {data.map((order, index) => (
          <div
            key={index}
            className='my-orders-order'>
            <img
              src={assets.parcel_icon}
              alt='Order Icon'
            />
            <p>
              {order.items.map(
                (item, index) =>
                  `${item.name} x ${item.quantity}${
                    index < order.items.length - 1 ? ", " : ""
                  }`
              )}
            </p>
            <p>Rs.{order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p>
              <span>&#x25cf;</span> <b>{order.status}</b>
            </p>
            <button
              onClick={() => fetchOrders()}
              className='track-btn'>
              Track Order
            </button>
            <button
              onClick={() => removeOrder(order._id)}
              className='remove-btn'>
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
