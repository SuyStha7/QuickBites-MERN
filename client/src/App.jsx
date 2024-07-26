import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Placeorder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgetPass from "./pages/ForgetPass/ForgetPass";
import ResetPass from "./pages/ResetPass/ResetPass";
import Contact from "./pages/Contact/Contact";
import { IoMdArrowDropup } from "react-icons/io";
import Profile from "./pages/Profile/Profile";

const App = () => {
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      {/* Header component */}
      <Header setShowLogin={setShowLogin} />

      <main className='app'>
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/cart'
            element={<Cart />}
          />
          <Route
            path='/order'
            element={<Placeorder />}
          />
          <Route
            path='/verify'
            element={<Verify />}
          />
          <Route
            path='/myorders'
            element={<MyOrders />}
          />
          <Route
            path='/contact'
            element={<Contact />}
          />
          <Route
            path='/profile'
            element={<Profile />}
          />
          <Route
            path='/forget-password'
            element={<ForgetPass />}
          />
          <Route
            path='/reset-password'
            element={<ResetPass />}
          />
        </Routes>
      </main>

      {/* Footer component */}
      <Footer />

      {/* Scroll to Top button */}
      {isVisible && (
        <div
          className='scroll-top'
          onClick={scrollToTop}>
          <IoMdArrowDropup />
        </div>
      )}

      {/* Toast container for notifications */}
      <ToastContainer position='bottom-right' />
    </>
  );
};

export default App;
