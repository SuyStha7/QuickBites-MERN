import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    return res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
};

// remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    return res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
};

// fetch user cart data
const getCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    res.json({ success: true, cartData: userData.cartData });
  } catch (error) {
    console.error("Error retrieving cart:", error);
    res.status(500).json({ success: false, message: "Error retrieving cart" });
  }
};

export { addToCart, removeFromCart, getCart };
