import { useState, useEffect } from "react";
import "./Product.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = ({ url }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${url}/api/food/detail/${id}`);
        if (response.data.success) {
          const product = response.data.data;
          setData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
          });
          setExistingImage(product.image); // Set the existing image
        } else {
          toast.error("Failed to fetch product details", { autoClose: 1000 });
        }
      } catch (error) {
        toast.error("Error fetching product details", { autoClose: 1000 });
      }
    };

    fetchProduct();
  }, [id, url]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onImageChangeHandler = (event) => {
    setImage(event.target.files[0]);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(
        `${url}/api/food/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message, { autoClose: 1000 });
        navigate("/list"); // Redirect to list page or another page on success
      } else {
        toast.error(response.data.message, { autoClose: 1000 });
      }
    } catch (error) {
      toast.error("Error updating product", { autoClose: 1000 });
    }
  };

  return (
    <div className='add'>
      <h2>Update Product</h2>
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
            placeholder='Enter product name'
            required
          />
        </div>

        <div className='add-product-description flex-col'>
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name='description'
            rows='6'
            placeholder='Enter product description'
            required></textarea>
        </div>

        <div className='add-image-upload flex-col'>
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=''
            />
          </label>
          <input
            onChange={onImageChangeHandler}
            type='file'
            id='image'
            hidden
          />
        </div>

        <div className='add-category-price'>
          <div className='add-category flex-col'>
            <p>Product Category</p>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name='category'
              required>
              <option value='Salad'>Salad</option>
              <option value='Rolls'>Rolls</option>
              <option value='Deserts'>Deserts</option>
              <option value='Sandwich'>Sandwich</option>
              <option value='Cake'>Cake</option>
              <option value='Pure Veg'>Pure Veg</option>
              <option value='Pasta'>Pasta</option>
              <option value='Noodles'>Noodles</option>
            </select>
          </div>

          <div className='add-price flex-col'>
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type='number'
              name='price'
              placeholder='Enter Price'
              required
            />
          </div>
        </div>

        <button
          type='submit'
          className='add-btn'>
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
