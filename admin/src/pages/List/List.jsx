import { useState, useEffect } from "react";
import "./List.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  // Fetch the list of foods
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch food list");
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
      toast.error("Error fetching food list");
    }
  };

  // Remove a food item
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodId,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message || "Failed to remove food");
      }
    } catch (error) {
      console.error("Error removing food:", error);
      toast.error("Error removing food");
    }
  };

  // Update a food item
  const updateFood = async (foodId) => {
    try {
      const response = await axios.put(`${url}/api/food/update/${foodId}`);
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message || "Failed to update food");
      }
    } catch (error) {
      console.error("Error updating food:", error);
      toast.error("Error updating food");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <h2>All Foods List</h2>
      <div className='list-table'>
        <div className='list-table-format title'>
          <p>Image</p>
          <p>Name</p>
          <p>Description</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>
        {list.map((item) => (
          <div
            key={item._id}
            className='list-table-format'>
            <img
              src={`${url}/images/${item.image}`}
              alt={item.name}
            />
            <p>{item.name}</p>
            <p>{item.description}</p>
            <p>{item.category}</p>
            <p>Rs.{item.price}</p>

            <div className='action'>
              <p
                className='cursor'
                onClick={() => removeFood(item._id)}>
                <IoMdRemoveCircleOutline className='icons remove' />
              </p>
              <Link to={`/updateProd/${item._id}`}>
                <FaEdit className='icons update' />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
