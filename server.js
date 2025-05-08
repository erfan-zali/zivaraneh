import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import cors from "cors";
import productRouter from "./src/routers/productRouter.js";
import userRouter from "./src/routers/userRouter.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import cartRouter from "./src/routers/cartRouter.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const port = process.env.PORT || 5000;
connectDB();

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// Static assets
app.use("/images", express.static("public/images"));
app.use(express.static(path.join(__dirname, "view/dist")));

// API routes
app.use("/api/products", productRouter);
app.use("/api/auth", userRouter);
app.use("/api/cart", cartRouter);

// Catch-all for frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "view/dist/index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
