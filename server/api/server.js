const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("../routes/authRoutes");
const cartRoutes = require("../routes/cartRoutes");
const productRoutes = require("../routes/productRoutes");
const serverless = require("serverless-http");
require("dotenv").config();

const app = express();

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://puma-clone-zpmn.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.options("*", (req, res) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://puma-clone-zpmn.vercel.app"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  return res.sendStatus(200);
});
// CORS options
const corsOptions = {
  origin: "https://puma-clone-zpmn.vercel.app", // no trailing slash
  credentials: true,
};

// Apply CORS middleware globally (automatically handles OPTIONS pre-flights)
app.use(cors(corsOptions));

// Parse JSON
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("hi.. server is live 🔥");
});

// Only start listening when run directly (so serverless handler still works)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
}

// Export for serverless and testing
module.exports = app;
module.exports.handler = serverless(app);
