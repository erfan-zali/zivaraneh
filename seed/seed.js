import mongoose from "mongoose";
import Product from "../src/models/Product.js";
import products from "./data/products.js";
import dotenv from "dotenv";
dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("🔗 Database Connected Successfully!");

    // ✅ Insert new products
    await Product.insertMany(products);
    console.log("✅ Database seeded successfully!");

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1); // Exit with failure
  }
};

seedDatabase();
