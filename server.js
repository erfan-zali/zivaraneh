import express from "express";
import dotenv from 'dotenv';
import connectDB from "./src/config/db.js";
import productRouter from './src/routers/productRouter.js';

dotenv.config();
const port = 5000;

connectDB();

const app = express();
app.use("/images", express.static('public/images'));
app.use(express.json());

app.use('/api/products', productRouter);



app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
})