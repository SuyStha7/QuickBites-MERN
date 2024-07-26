import { useState } from "react";
import "./FormBox.css";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const FormBox = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    dish: "",
    rating: "",
    review: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send email using EmailJS
    emailjs
      .send(
        "service_b8h5r7k",
        "template_m9c75rh",
        formData,
        "XEwQS3W476owBPf9r"
      )
      .then(() => {
        toast.success("Review submitted successfully!", { autoClose: 1000 });
        setFormData({
          name: "",
          email: "",
          address: "",
          dish: "",
          rating: "",
          review: "",
        });
      })
      .catch(() => {
        toast.error("Failed to submit review. Please try again later.", {
          autoClose: 1000,
        });
      });
  };

  return (
    <div
      className='FormBox'
      id='FormBox'>
      <form
        className='review-form'
        onSubmit={handleSubmit}>
        <div className='FormBox-title'>
          <h2>Submit your food review</h2>
        </div>
        <div className='FormBox-input'>
          <div className='FormBox-info'>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Your Name'
              required
            />
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Your Email'
              required
            />
          </div>
          <br />
          <div className='FormBox-review'>
            <input
              type='text'
              name='address'
              value={formData.address}
              onChange={handleChange}
              placeholder='Your Address'
              required
            />
            <input
              type='text'
              name='dish'
              value={formData.dish}
              onChange={handleChange}
              placeholder='Dish Name'
              required
            />
          </div>
          <br />
          <div className='rating-input'>
            <select
              name='rating'
              value={formData.rating}
              onChange={handleChange}
              required>
              <option
                value=''
                disabled>
                Select Rating
              </option>
              <option value='1'>1 Star</option>
              <option value='2'>2 Stars</option>
              <option value='3'>3 Stars</option>
              <option value='4'>4 Stars</option>
              <option value='5'>5 Stars</option>
            </select>
          </div>
          <br />
          <textarea
            name='review'
            value={formData.review}
            onChange={handleChange}
            placeholder='Your Review'
            cols='30'
            rows='5'
            required></textarea>
          <br />
          <button type='submit'>Submit Review</button>
        </div>
      </form>
    </div>
  );
};

export default FormBox;
