import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
const addProd = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({ success: true, message: "Product added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const addCat = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Name is required" });
  }

  const food = new foodModel({ name });

  try {
    await food.save();
    res.status(201).json({ success: true, message: "Category added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error adding category",
      error: error.message,
    });
  }
};

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const removeFood = async (req, res) => {
  try {
    // Find the food item by ID
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }

    // Construct the path to the image file
    const imagePath = path.join(__dirname, "../uploads", food.image);

    // Delete the image file
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image file:", err);
      }
    });

    // Delete the food item from the database
    await foodModel.findByIdAndDelete(req.body.id);

    // Respond with success
    res.json({ success: true, message: "Food removed successfully" });
  } catch (error) {
    console.error("Error removing food item:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// single food item
const singleProd = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, data: food });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Update food item
const updateFood = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category } = req.body;

  try {
    // Find the existing food item
    const existingFood = await foodModel.findById(id);

    if (!existingFood) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }

    // Update fields with new data
    existingFood.name = name || existingFood.name;
    existingFood.description = description || existingFood.description;
    existingFood.price = price || existingFood.price;
    existingFood.category = category || existingFood.category;

    // Check if a new image is being uploaded
    if (req.file) {
      const oldImagePath = path.join("uploads", existingFood.image);

      // Remove the old image from the file system
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.log(`Error removing old image: ${err.message}`);
        }
      });

      // Update the image filename
      existingFood.image = req.file.filename;
    }

    // Save the updated food item
    await existingFood.save();

    res.json({ success: true, message: "Food item updated" });
  } catch (error) {
    console.log(`Error updating food item: ${error.message}`);
    res
      .status(500)
      .json({ success: false, message: "Error updating food item" });
  }
};

export { addProd, listFood, removeFood, addCat, singleProd, updateFood };
