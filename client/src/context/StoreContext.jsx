import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));

  const url = "http://localhost:4000"

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
    }
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list")
    setFoodList((foodList) => [...foodList, ...response.data.data]);
  }

  const loadCartData = async (token) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
    setCartItems(response.data.cartData)
  }

  useEffect(() => {
    async function loadData() {
      await fetchFoodList()
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"))
        await loadCartData(localStorage.getItem("token"))
      }
    }
    loadData();
  }, [])

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = foodList.find((product) => product._id === item);
        // Check if itemInfo is defined before accessing its properties
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        } else {
          console.error('Item not found in foodList:', item);
        }
      }
    }
    return totalAmount;
  };

  const contextValue = {
    foodList,
    setFoodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
