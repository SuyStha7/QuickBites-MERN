import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact" id="contact">
      <form className="contact-container">
        <div className="contact-title">
          <h2>Give Us Feedback</h2>
          <div className="contact-input">
            <input type="text" placeholder=" Your Name" />
            <br />
            <input type="email" placeholder="Your email" required />
            <textarea
              name=""
              id=""
              cols="30"
              rows="5"
              placeholder="Your Message"
            ></textarea>
          </div>
          <button>Send</button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
