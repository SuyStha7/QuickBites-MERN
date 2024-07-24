import { useState } from "react";
import "./ResetPass.css";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import axios from "axios"; // Don't forget to import axios

const ResetPass = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assume we have an API endpoint that handles password reset requests
      await axios.post("/api/user/request-password-reset", { email });
      toast.success("Password reset email sent!", { autoClose: 1000 });
    } catch (error) {
      console.error("Error sending reset email:", error);
      toast.error("Failed to send reset email. Please try again.", {
        autoClose: 1000,
      });
    }
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

export default ResetPass;
