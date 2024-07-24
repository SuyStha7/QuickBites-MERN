import { MdProductionQuantityLimits } from "react-icons/md";
import { CiDiscount1 } from "react-icons/ci";
import { CiDollar } from "react-icons/ci";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { assets } from "../../assets/assets";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="offers-box">
          <div className="offer">
            <MdProductionQuantityLimits className="offer-icon" />
            <span className="offer-text">Everyday fresh products</span>
          </div>

          <div className="offer">
            <CiDiscount1 className="offer-icon" />
            <span className="offer-text">Daily Mega Discounts</span>
          </div>

          <div className="offer">
            <CiDollar className="offer-icon" />
            <span className="offer-text">Best price on the market</span>
          </div>
        </div>

        <div className="footer-menu-list-wrapper">
          <div className="footer-menu-list-box">
            <span className="footer-menu-list-title">fruits & vegetables</span>
            <ul className="footer-menu-list">
              <li>Fresh Vegetables</li>
              <li>Herbs & Seasonings</li>
              <li>Fresh Fruits</li>
              <li>Cuts & Sprouts</li>
              <li>Exotic Fruits & Veggies</li>
              <li>Packaged Produce</li>
              <li>Party Trays</li>
            </ul>
          </div>

          <div className="footer-menu-list-box">
            <span className="footer-menu-list-title">
              Breakfast & vegetables
            </span>
            <ul className="footer-menu-list">
              <li>Milk & Flavoured Milk</li>
              <li>Butter and Margarine</li>
              <li>Cheese</li>
              <li>Eggs Substitutes</li>
              <li>Honey</li>
              <li>Marmalades</li>
              <li>Sour Cream and Dips</li>
              <li>Yogurt</li>
            </ul>
          </div>

          <div className="footer-menu-list-box">
            <span className="footer-menu-list-title">meat & seafood</span>
            <ul className="footer-menu-list">
              <li>Breakfast Sausage</li>
              <li>Dinner Sausage</li>
              <li>Beef</li>
              <li>Chicken</li>
              <li>Sliced Deli Meat</li>
              <li>Shrimp</li>
              <li>Wild Caught Fillets</li>
              <li>Crab and Shellfish</li>
              <li>Farm Raised Fillets</li>
            </ul>
          </div>

          <div className="footer-menu-list-box">
            <span className="footer-menu-list-title">beverages</span>
            <ul className="footer-menu-list">
              <li>Water</li>
              <li>Sparkling Water</li>
              <li>Soda & Pop</li>
              <li>Coffee</li>
              <li>Milk & Plant-Based Milk</li>
              <li>Tea & Kombucha</li>
              <li>Drink Boxes & Pouches</li>
              <li>Craft Beer</li>
              <li>Wine</li>
            </ul>
          </div>

          <div className="footer-menu-list-box">
            <span className="footer-menu-list-title">breads & bakery</span>
            <ul className="footer-menu-list">
              <li>Milk & Flavoured Milk</li>
              <li>Butter and Margarine</li>
              <li>Cheese</li>
              <li>Eggs Substitutes</li>
              <li>Honey</li>
              <li>Marmalades</li>
              <li>Sour Cream and Dips</li>
              <li>Yogurt</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <img className="company-logo" src={assets.logo} alt="Comapny Logo" />

        <ul className="company-about-box">
          <li className="nav-bar-list-item">About</li>
          <li className="nav-bar-list-item">Support</li>
          <li className="nav-bar-list-item">Privacy Policy</li>
          <li className="nav-bar-list-item">Terms and Conditions</li>
        </ul>

        <div className="social-media-box">
          <FaFacebookF className="social-media-icon" />
          <FaTwitter className="social-media-icon" />
          <FaInstagram className="social-media-icon" />
        </div>

        <p className="copyright-text">
          &copy; 2024 QuickBite. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
