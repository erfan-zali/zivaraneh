import express from "express";
import { validateSignup } from "../middlewares/validateSingup.js";
import { checkUserExist, signUp, signIn, logout } from "../controllers/authController.js";

const userRouter = express.Router();

userRouter.route('/sign-up')
  .post(validateSignup, signUp)
userRouter.route('/log-in')
  .post(signIn)
userRouter.route('/check')
  .get(checkUserExist)
userRouter.route('/log-out')
  .post(logout)

export default userRouter;