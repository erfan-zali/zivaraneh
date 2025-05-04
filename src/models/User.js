import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true  },
  lastName: { type: String, required: true, trim: true },
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  emaiVerified: { type: Boolean, default: false },
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  orders: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number },
      total: { type: Number },
      purchasedAt: { type: Date, default: Date.now }
    }
  ],
  address: { type: String, default: '' }
});

export default mongoose.model("User", userSchema)