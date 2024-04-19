import React, { useContext, useState } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import Button from '@mui/material/Button'

const FoodDisplay = ({ category }) => {
  const { foodList } = useContext(StoreContext);
  const [limit, setLimit] = useState(8)

  return (
    <div className="food-display" id="food-display">
      <div className="container">
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
          {foodList.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
          })}
        </div>
        {
          limit < foodList.length && (
            <div className="container">
              <Button onClick={() => {
                setLimit(limit + 4);
              }}>Load More</Button>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default FoodDisplay;