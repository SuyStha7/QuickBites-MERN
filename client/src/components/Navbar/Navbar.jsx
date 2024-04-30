import { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { IoMdCart } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <>
      <div className='header'>
        <div className='container'>
          <div className='header-top'>
            <p>
              "Where Flavor Meets Convenience, Bringing Deliciousness Right to
              Your Doorstep!"
            </p>
            <ul className='items'>
              <li>
                <IoMdMail className='icon' /> business@opencart.org
              </li>
              <li>
                <FaPhoneAlt className='icon' /> 01-4734522
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='navbar fixed'>
        <Link to={"/"}>
          <img
            src={assets.logo}
            alt=''
            className='logo'
          />
        </Link>
        <ul className='navbar-menu'>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <a href='#explore-menu'>Menu</a>
          </li>
          <li>
            <a href='#feedback'>Testimonials</a>
          </li>
          <li>
            <a href='#app-download'>Mobile-app</a>
          </li>
          <li>
            <a href='#blogs'>Blogs</a>
          </li>
          <li>
            <a href='#contact'>Contact us</a>
          </li>
        </ul>

        <div className='search'>
          <input
            type='text'
            placeholder='Search here...'
            className='searchInput'
          />
          <FaSearch className='searchIcon' />
        </div>

        <div className='navbar-right'>
          <div className='navbar-search-icon'>
            <Link
              to={"/cart"}
              className='navbar-cart'>
              <IoMdCart className='cartIcon' />
            </Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>

          {!token ? (
            <Button onClick={() => setShowLogin(true)}>Login</Button>
          ) : (
            <div className='navbar-profile'>
              <img
                src={assets.profile_image}
                alt=''
              />
              <ul className='nav-profile-dropdown'>
                <li onClick={() => navigate("/myorders")}>
                  <img
                    src={assets.bag_icon}
                    alt=''
                  />
                  <p>Orders</p>
                </li>
                <li onClick={logout}>
                  <img
                    src={assets.logout_icon}
                    alt=''
                  />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
