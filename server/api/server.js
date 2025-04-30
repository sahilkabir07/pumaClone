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

// CORS options to handle cross-origin requests and send credentials (cookies)
const corsOptions = {
  origin: "https://puma-clone-zpmn.vercel.app", // Allow frontend domain
  credentials: true, // Allow credentials (cookies/session)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

// Use CORS middleware globally for all routes
app.use(cors(corsOptions));

// Middleware to parse incoming JSON requests
app.use(express.json());

// MongoDB connection setup
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Routes setup
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("hi.. server is live 🔥");
});

// Export app for serverless function
module.exports = app;
module.exports.handler = serverless(app);
