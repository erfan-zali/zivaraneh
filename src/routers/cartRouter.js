import express from "express";
import {
  addToCart,
  decreaseFromCart,
  clearCart,
  getCart,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.put("/decrease", decreaseFromCart);      // Body: userId, productId
cartRouter.post("/", addToCart);                    // Body: userId, productId
cartRouter.delete("/", clearCart);                  // Body: userId
cartRouter.get("/:userId", getCart);                // Only reading, so param is okay


export default cartRouter;
