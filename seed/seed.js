import mongoose from 'mongoose';
import Product from '../src/models/Product.js';
import products from './data/products.js';
import dotenv from 'dotenv';

// Config paths explicitly for Docker
dotenv.config({ path: '/app/.env' }); 

const seedDatabase = async () => {
  try {
    console.log("🔄 Attempting to connect to MongoDB...");
    
    await mongoose.connect(process.env.DATABASE_URI || 'mongodb://mongodb:27017/zivaraneh', {
      serverSelectionTimeoutMS: 5000
    });
    console.log("✅ MongoDB Connected!");

    // Clear existing data
    await Product.deleteMany();
    console.log("🧹 Cleared existing products");

    // Insert new data
    await Product.insertMany(products);
    console.log(`🌱 Seeded ${products.length} products successfully!`);

  } catch (error) {
    console.error('❌ SEEDING FAILED:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB connection closed");
  }
};

// Execute
seedDatabase();
