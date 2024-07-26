import { useContext, useState, useRef, useEffect } from "react";
import "./Header.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { IoMdCart } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const Header = ({ setShowLogin }) => {
  const { getTotalCartAmount, token, setToken, foodList, url } =
    useContext(StoreContext);

  const [searchFood, setSearchFood] = useState("");
  const [showProfileDropdown, setshowProfileDropdown] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  const navigate = useNavigate();
  const profileDropdownRef = useRef(null);
  const profileIconRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleInput = (e) => {
    setSearchFood(e.target.value);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    toast.success("You are successfully logged out", { autoClose: 1000 });
  };

  const toggleNavbar = () => {
    setShowNavbar((prev) => !prev);
  };

  // Handle click outside of profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target) &&
        !profileIconRef.current.contains(event.target)
      ) {
        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Set a timeout to close the dropdown
        timeoutRef.current = setTimeout(() => {
          setshowProfileDropdown(false);
        }, 200); // Adjust delay as needed
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // Clean up the timeout on component unmount
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className='header'>
        <h1 className='slogan-text'>
          "Where Flavor Meets Convenience, Bringing Deliciousness Right to Your
          Doorstep!"
        </h1>

        <ul className='header-contact-list'>
          <li className='header-contact-list-item'>
            <MdEmail className='header-contact-icon' />
            <span className='header-contact-list-item-text'>
              business@quickbite.org
            </span>
          </li>

          <li className='header-contact-list-item'>
            <BsFillTelephoneFill className='header-contact-icon' />
            <span className='header-contact-list-item-text'>01-4734522</span>
          </li>
        </ul>
      </div>

      <div className='navbar'>
        <GiHamburgerMenu
          className='hamburger-icon'
          onClick={toggleNavbar}
        />

        <Link to={"/"}>
          <img
            src={assets.logo}
            alt=''
            className='company-logo'
          />
        </Link>

        <div className={`overlay-container ${!showNavbar ? "hide" : ""}`}>
          <div className='navbar-menu'>
            <IoMdClose
              className='close-icon'
              onClick={toggleNavbar}
            />

            <ul className='navbar-menu-list'>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <a href='#explore-menu'>Menu</a>
              </li>
              <li>
                <a href='#appDownload'>Mobile App</a>
              </li>
              <li>
                <Link to={"/contact"}>Contact</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='search-bar-container'>
          <div className='search-bar'>
            <input
              type='text'
              name='searchInput'
              id='searchInput'
              value={searchFood}
              onChange={handleInput}
              placeholder='Search here...'
              autoComplete='off'
            />
            <FaSearch className='search-icon' />
          </div>

          <div className='search-bar-dropdown'>
            {foodList
              .filter((item) => {
                let searchItemName = searchFood.toLowerCase();
                let itemName = item.name.toLowerCase();

                return (
                  searchItemName.trim() &&
                  itemName.includes(searchItemName) &&
                  searchItemName !== itemName
                );
              })
              .slice(0, 5)
              .map((item) => (
                <div
                  className='search-bar-dropdown-row'
                  key={item._id}
                  onClick={() => {
                    setSearchFood(item.name);
                  }}>
                  <img
                    className='thumbnail-image'
                    src={`${url}/images/${item.image}`}
                    alt='Food Thumbnail Image'
                  />
                  <p>
                    <span>
                      {item.name.slice(
                        0,
                        item.name
                          .toLowerCase()
                          .indexOf(searchFood.toLowerCase())
                      )}
                    </span>
                    <span style={{ fontWeight: 700, color: "#E8751A" }}>
                      {item.name.substr(
                        item.name
                          .toLowerCase()
                          .indexOf(searchFood.toLowerCase()),
                        searchFood.length
                      )}
                    </span>
                    <span>
                      {item.name.slice(
                        item.name
                          .toLowerCase()
                          .indexOf(searchFood.toLowerCase()) + searchFood.length
                      )}
                    </span>
                  </p>
                </div>
              ))}
          </div>
        </div>

        <div className='navbar-right'>
          <div className='cart-icon-box'>
            {token ? (
              <IoMdCart
                className='cart-icon'
                onClick={() => {
                  navigate("/cart");
                }}
              />
            ) : (
              <IoMdCart
                className='cart-icon disabled'
                onClick={() => {
                  toast.info("You must log in to view your cart.", {
                    autoClose: 1000,
                  });
                }}
              />
            )}
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>

          {!token ? (
            <div
              className='login-btn'
              onClick={() => setShowLogin(true)}>
              Login
            </div>
          ) : (
            <div
              className='navbar-profile'
              ref={profileIconRef}>
              <img
                className='profile-image'
                src={assets.profile_image}
                alt='Profile Image Thumbnail'
                onClick={() => {
                  setshowProfileDropdown((prev) => !prev);
                }}
              />

              {showProfileDropdown && (
                <ul
                  className='nav-profile-dropdown'
                  ref={profileDropdownRef}>
                  <li onClick={() => navigate("/profile")}>
                    <img
                      src={assets.profile_icon}
                      alt=''
                    />
                    <span>Profile</span>
                  </li>
                  <li onClick={() => navigate("/myorders")}>
                    <img
                      src={assets.bag_icon}
                      alt=''
                    />
                    <span>Orders</span>
                  </li>

                  <li onClick={logout}>
                    <img
                      src={assets.logout_icon}
                      alt=''
                    />
                    <span>Logout</span>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
