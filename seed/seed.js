import mongoose from "mongoose";
import Product from "../src/models/Product.js";
import products from "./data/products.js";
import dotenv from "dotenv";

// Manually set the path to the root directory `.env` file
dotenv.config({ path: "../.env" });

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("🔗 Database Connected Successfully!");

    // ❌ Clear the Product collection
    await Product.deleteMany();
    console.log("🗑️  Cleared existing products!");

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
