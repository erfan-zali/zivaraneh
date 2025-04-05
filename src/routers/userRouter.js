import express from "express";
import authController from '../controllers/authController.js';

const userRouter = express.Router();

userRouter.route('/sign-up')
  .post(authController)

export default userRouter;