import express from "express";
import {
  addCat,
  addProd,
  listFood,
  removeFood,
  singleProd,
  updateFood,
} from "../controllers/foodController.js";
import multer from "multer";
import path from "path";

// Initialize express router
const foodRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post("/addProd", upload.single("image"), addProd);
foodRouter.get("/detail/:id", singleProd);
foodRouter.post("/addCat", addCat);
foodRouter.get("/list", listFood);
foodRouter.delete("/remove", removeFood);
foodRouter.put("/update/:id", upload.single("image"), updateFood);

export default foodRouter;
