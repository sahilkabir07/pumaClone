const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("../routes/authRoutes");
const cartRoutes = require("../routes/cartRoutes");
const productRoutes = require("../routes/productRoutes");
const serverless = require("serverless-http");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("hi.. server is live 🔥");
});

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
}

module.exports = app;
module.exports.handler = serverless(app);
