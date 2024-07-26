import { useState } from "react";
import "./ForgetPass.css";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";

const ForgetPass = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = "service_b8h5r7k";
    const templateID = "template_yakscqj";
    const userID = "XEwQS3W476owBPf9r";

    emailjs
      .send(
        serviceID,
        templateID,
        {
          user_email: email,
          reset_link: `http://localhost:4000/reset-password/${generateToken()}`,
        },
        userID
      )
      .then((result) => {
        console.log(result.text);
        toast.success("Password reset email sent!", { autoClose: 1000 });
      })
      .catch((error) => {
        console.error("Error sending reset email:", error);
        toast.error("Failed to send reset email. Please try again.", {
          autoClose: 1000,
        });
      });
  };

  const generateToken = () => {
    // Generate a random token (this should be handled securely on the server-side in a real application)
    return Math.random().toString(36).substr(2);
  };

  return (
    <div className='forget-pass-container'>
      <h2>Forgot Password</h2>
      <p>Enter your email address to reset your password.</p>
      <form
        onSubmit={handleSubmit}
        className='forget-pass-form'>
        <input
          type='email'
          name='user_email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Your email address'
          required
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'>
          Send Reset Link
        </Button>
      </form>
    </div>
  );
};

export default ForgetPass;
