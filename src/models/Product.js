import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    IKU: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    stock: { type: Number, min: 0 },
    images: { type: [String], default: [] },
    col: { type: String, trim: true },
  },
  { timestamps: true }
);

productSchema.index({ name: 'text' });

export default mongoose.model("Product", productSchema);
