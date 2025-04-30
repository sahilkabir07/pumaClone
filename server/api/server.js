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

// CORS Setup (Add all necessary headers)
app.use(
  cors({
    origin: "https://puma-clone-zpmn.vercel.app", // Your frontend
    credentials: true,
  })
);

// Enable preflight (important for Vercel + serverless)
app.options("*", cors());

app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("hi.. server is live 🔥");
});

// Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);
