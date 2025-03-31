import express from "express";
import dotenv from 'dotenv';
import connectDB from "./src/config/db.js";
import cors from 'cors';
import productRouter from './src/routers/productRouter.js';

dotenv.config();
const port = process.env.port || 5000;
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/images", express.static('public/images'));
app.use('/api/products', productRouter);

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
})