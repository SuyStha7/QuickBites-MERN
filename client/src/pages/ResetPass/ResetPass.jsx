import { useState } from "react";
import "./ResetPass.css";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import eye icons

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.", { autoClose: 1000 });
      return;
    }
    try {
      // Replace with your API endpoint
      await axios.post("/api/user/reset-password", { token, newPassword });
      toast.success("Password has been reset successfully!", {
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Failed to reset password. Please try again.", {
        autoClose: 1000,
      });
    }
  };

  return (
    <div className='reset-password-container'>
      <h2>Reset Password</h2>
      <form
        onSubmit={handleSubmit}
        className='reset-password-form'>
        <div className='password-field'>
          <input
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder='New Password'
            required
          />
          <button
            type='button'
            className='toggle-password'
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
        <div className='password-field'>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm New Password'
            required
          />
          <button
            type='button'
            className='toggle-password'
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
        <Button
          type='submit'>
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
