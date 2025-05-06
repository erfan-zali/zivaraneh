import express from "express";
import {
  addToCart,
  decreaseFromCart,
  clearCart,
  getCart,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.put("/decrease", decreaseFromCart);     
cartRouter.post("/", addToCart);                    
cartRouter.delete("/", clearCart);                 
cartRouter.get("/:userId", getCart);           

export default cartRouter;
