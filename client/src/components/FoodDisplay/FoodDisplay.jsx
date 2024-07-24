import { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { foodList } = useContext(StoreContext);

  return (
    <div
      className='food-display'
      id='food-display'>
      <div className='container'>
        <h2>Top dishes near you</h2>
        <div className='food-display-list'>
          {foodList.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <div
                  key={index}>
                  <FoodItem
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default FoodDisplay;
