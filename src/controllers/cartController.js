import User from "../models/User.js";
import Product from "../models/Product.js";

// Add to Cart (orders)
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const existingItem = user.orders.find(
      (item) => item.productId.toString() === productId
    );

    const itemQuantity = quantity || 1;
    const itemTotal = itemQuantity * product.price;

    if (existingItem) {
      existingItem.quantity += itemQuantity;
      existingItem.total = existingItem.quantity * product.price;
    } else {
      user.orders.push({
        productId,
        quantity: itemQuantity,
        total: itemTotal,
      });
    }

    await user.save();
    res
      .status(200)
      .json({ message: "Product added to cart", cart: user.orders });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Decrease item quantity or remove if quantity is 1
export const decreaseFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const item = user.orders.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    if (item.quantity > 1) {
      item.quantity -= 1;
      const product = await Product.findById(productId);
      item.total = item.quantity * product.price;
    } else {
      // Remove if quantity is 1
      user.orders = user.orders.filter(
        (item) => item.productId.toString() !== productId
      );
    }

    await user.save();
    res.status(200).json({ message: "Cart updated", cart: user.orders });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.orders = [];
    await user.save();

    res.status(200).json({ message: "Cart cleared", cart: [] });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Cart
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("orders.productId");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ cart: user.orders });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

