import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
export default async function connectDB() {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log('✅ Database Connected');
    } catch (error) {
        console.error('❌ Error connecting to database', error.message);
        process.exit(1);
    }
}