import { useState } from "react";
import "./Contact.css";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
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
        toast.success("Message sent successfully!", { autoClose: 1000 });
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => {
        toast.error("Failed to send message. Please try again later.", {
          autoClose: 1000,
        });
      });
  };

  return (
    <div
      className='contact'
      id='contact'>
      <div className='contact-container'>
        <form
          className='contact-form'
          onSubmit={handleSubmit}>
          <h2>Get in Touch</h2>
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
          <textarea
            name='message'
            value={formData.message}
            onChange={handleChange}
            placeholder='Your Message'
            rows='6'
            required></textarea>
          <button type='submit'>Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
