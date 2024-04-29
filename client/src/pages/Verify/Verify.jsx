import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.post(url + "/api/order/verify", {
          success,
          orderId,
        });

        console.log("Server response:", response.data); // Debugging

        if (response.data.success) {
          navigate("/myorders");
          console.log(myorders)
        } else {
          navigate('/')
          console.log('/')
        }
      } catch (error) {
        console.error("Error verifying payment:", error); // Debugging
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className='verify'>
      <div className='spinner'></div>
    </div>
  );
};

export default Verify;
