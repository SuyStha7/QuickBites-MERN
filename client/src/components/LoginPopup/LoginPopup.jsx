import { useState, useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./LoginPopup.css";
import Button from "@mui/material/Button";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);

  // Yup validation schema
  const validationSchema = Yup.object({
    name:
      currState === "Sign Up"
        ? Yup.string().required("Name is required")
        : Yup.string(),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character"
      ),
    terms: Yup.boolean().oneOf([true], "You must agree to the terms"),
  });

  const handleFormSubmit = async (values) => {
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, values);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
        toast.success("Successfully logged in!", { autoClose: 1000 });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during login/register:", error);
      toast.error("An error occurred. Please try again.", { autoClose: 1000 });
    }
  };

  return (
    <div className='login-popup'>
      <Formik
        initialValues={{ name: "", email: "", password: "", terms: false }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}>
        {({ values, handleChange }) => (
          <Form className='login-popup-container'>
            <div className='login-popup-title'>
              <h2>{currState}</h2>
              <img
                onClick={() => setShowLogin(false)}
                src={assets.cross_icon}
                alt='Close'
              />
            </div>
            <div className='login-popup-input'>
              {currState === "Sign Up" && (
                <>
                  <div className='name-container'>
                    <Field
                      type='text'
                      name='name'
                      placeholder='Your name'
                    />
                    <ErrorMessage
                      name='name'
                      component='p'
                      className='error-message'
                    />
                  </div>
                </>
              )}

              <div className='email-container'>
                <Field
                  type='email'
                  name='email'
                  placeholder='Your email'
                />
                <ErrorMessage
                  name='email'
                  component='p'
                  className='error-message'
                />
              </div>

              <div className='password-container'>
                <Field
                  type={showPassword ? "text" : "password"}
                  name='password'
                  placeholder='Password'
                  onChange={(e) => {
                    handleChange(e);
                    setIsPasswordEmpty(e.target.value === "");
                  }}
                />
                {!isPasswordEmpty && (
                  <span
                    className='password-toggle'
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                )}
                <ErrorMessage
                  name='password'
                  component='p'
                  className='error-message'
                />
              </div>
            </div>

            <div className='popup-container'>
              <div className='login-popup-condition'>
                <Field
                  type='checkbox'
                  name='terms'
                />
                <p>
                  By continuing, I agree to the terms of use & privacy policy
                </p>
              </div>
            </div>

            <Button type='submit'>
              {currState === "Sign Up" ? "Create account" : "Login"}
            </Button>
            {currState === "Login" ? (
              <p>
                Create a new account?{" "}
                <span onClick={() => setCurrState("Sign Up")}>Register</span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span onClick={() => setCurrState("Login")}>Login here</span>
              </p>
            )}
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default LoginPopup;
