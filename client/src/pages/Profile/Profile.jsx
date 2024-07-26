import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import "./Profile.css"; // Ensure you create a CSS file for styling

const Profile = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newDetails, setNewDetails] = useState({ ...user });

  const [passwordDetails, setPasswordDetails] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user/profile"); // API endpoint to get user data
        setUser(response.data);
        setNewDetails(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data.");
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.post("/api/user/update-profile", newDetails);
      setUser(newDetails);
      setIsEditing(false);
      toast.success("Profile updated successfully!", { autoClose: 1000 });
    } catch (error) {
      console.error("Error updating profile:", error, { autoClose: 1000 });
      toast.error("Failed to update profile.", { autoClose: 1000 });
    }
  };

  const handlePasswordUpdate = async () => {
    if (passwordDetails.newPassword !== passwordDetails.confirmPassword) {
      return toast.error("New passwords do not match.", { autoClose: 1000 });
    }

    try {
      await axios.post("/api/user/change-password", {
        currentPassword: passwordDetails.currentPassword,
        newPassword: passwordDetails.newPassword,
      });
      setPasswordDetails({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success("Password updated successfully!", { autoClose: 1000 });
    } catch (error) {
      console.error("Error changing password:", error, { autoClose: 1000 });
      toast.error("Failed to change password.", { autoClose: 1000 });
    }
  };

  return (
    <div className='profile-container'>
      <h2>{isEditing ? "Edit User Profile" : "User Profile"}</h2>
      <div className='profile-info'>
        <div className='profile-field'>
          <label>Username:</label>
          {isEditing ? (
            <input
              type='text'
              name='username'
              value={newDetails.username}
              onChange={handleChange}
            />
          ) : (
            <p>{user.username}</p>
          )}
        </div>
        <div className='profile-field'>
          <label>Email:</label>
          {isEditing ? (
            <input
              type='email'
              name='email'
              value={newDetails.email}
              onChange={handleChange}
            />
          ) : (
            <p>{user.email}</p>
          )}
        </div>
        <div className='profile-field'>
          <label>Address:</label>
          {isEditing ? (
            <input
              type='text'
              name='address'
              value={newDetails.address}
              onChange={handleChange}
            />
          ) : (
            <p>{user.address}</p>
          )}
        </div>
        {isEditing && (
          <div className='password-change'>
            <div className='password-field'>
              <label>Current Password:</label>
              <input
                type='password'
                name='currentPassword'
                value={passwordDetails.currentPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className='password-field'>
              <label>New Password:</label>
              <input
                type='password'
                name='newPassword'
                value={passwordDetails.newPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className='password-field'>
              <label>Confirm New Password:</label>
              <input
                type='password'
                name='confirmPassword'
                value={passwordDetails.confirmPassword}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
        )}
        <div className='profile-actions'>
          {isEditing ? (
            <>
              <Button
                variant='contained'
                color='primary'
                onClick={handleSave}>
                Save
              </Button>
              <Button
                variant='contained'
                color='success'
                onClick={handlePasswordUpdate}>
                Update Password
              </Button>
              <Button
                variant='outlined'
                onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant='contained'
              color='primary'
              onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
