import express from "express";
import {
  loginUser,
  registerUser,
  requestPasswordReset,
  resetPassword,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/request-password-reset", requestPasswordReset);
userRouter.post("/reset-password", resetPassword);

export default userRouter;
