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

const corsOptions = {
  origin: "https://puma-clone-zpmn.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("hi.. server is live 🔥");
});

module.exports = app;
module.exports.handler = serverless(app);
