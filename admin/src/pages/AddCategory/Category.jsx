import React, { useState } from "react";
import "./Category.css";  
import axios from "axios";
import { toast } from "react-toastify";

const Category = ({ url }) => {
  const [data, setData] = useState({
    name: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    const response = await axios.post(`${url}/api/food/addCat`, formData);
    if (response.data.success) {
      setData({
        name: "",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className='add'>
      <form
        className='flex-col'
        onSubmit={onSubmitHandler}>
        <div className='add-product-name flex-col'>
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type='text'
            name='name'
            placeholder='Type here'
          />
        </div>

        <button
          type='submit'
          className='add-btn'>
          Add
        </button>
      </form>
    </div>
  );
};

export default Category;
