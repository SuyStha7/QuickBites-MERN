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

const App = () => {
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {/* Conditional rendering of LoginPopup */}
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
        </Routes>
      </main>

      {/* Footer component */}
      <Footer />

      {/* Toast container for notifications */}
      <ToastContainer />
    </>
  );
};

export default App;
