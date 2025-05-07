const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("../routes/authRoutes");
const cartRoutes = require("../routes/cartRoutes");
const productRoutes = require("../routes/productRoutes");
const serverless = require("serverless-http");

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "https://puma-clone-u3dc.vercel.app",
    credentials: true,
  })
);
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("hii..");
});

module.exports = app;
module.exports.handler = serverless(app);
