import "./Footer.css";
import Button from "@mui/material/Button";
import { MdProductionQuantityLimits } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { CiDiscount1 } from "react-icons/ci";
import { CiDollar } from "react-icons/ci";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className='footer'>
        <div className='container'>
          <div className='offers'>
            <div className='offer'>
              <span>
                <MdProductionQuantityLimits />
              </span>
              <h4>Everyday fresh products</h4>
            </div>

            <span className='line'></span>

            <div className='offer'>
              <span>
                <CiDiscount1 />
              </span>
              <h4>Daily Mega Discounts</h4>
            </div>

            <span className='line'></span>

            <div className='offer'>
              <span>
                <CiDollar />
              </span>
              <h4>Best price on the market</h4>
            </div>
          </div>

          <div className='footer_list'>
            <div className='footerBox'>
              <h4>FRUIT & VEGETABLES</h4>
              <ul>
                <li>Fresh Vegetables</li>
                <li>Herbs & Seasonings</li>
                <li>Fresh Fruits</li>
                <li>Cuts & Sprouts</li>
                <li>Exotic Fruits & Veggies</li>
                <li>Packaged Produce</li>
                <li>Party Trays</li>
              </ul>
            </div>

            <div className='footerBox'>
              <h4>BREAKFAST & DAIRY</h4>
              <ul>
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

            <div className='footerBox'>
              <h4>MEAT & SEAFOOD</h4>
              <ul>
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

            <div className='footerBox'>
              <h4>BEVERAGES</h4>
              <ul>
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

            <div className='footerBox'>
              <h4>BREADS & BAKERY</h4>
              <ul>
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
      </div>

      <div className='footerBottom'>
        <div className='container'>
          <div className='copyright'>
            <p>Copyright 2024 © OpenCart. All rights reserved.</p>
            <ul className='items'>
              <li>Privacy Policy</li>
              <li>Terms and Conditions</li>
              <li>Cookie</li>
            </ul>
            <div className='social'>
              <Button>
                <FaFacebookF />
              </Button>
              <Button>
                <FaTwitter />
              </Button>
              <Button>
                <FaInstagram />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
