import express from "express";
import authController from '../controllers/authController.js';
import { validateSignup } from "../middlewares/validateSingup.js";

const userRouter = express.Router();

userRouter.route('/sign-up')
  .post(validateSignup, authController)

export default userRouter;