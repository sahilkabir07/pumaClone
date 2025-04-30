const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

const allowedCategories = [
  "men",
  "women",
  "kids",
  "sports",
  "trending",
  "collaboration",
];

router.get("/:category", async (req, res) => {
  const { category } = req.params;

  if (!allowedCategories.includes(category.toLowerCase())) {
    return res.status(400).json({ message: "Invalid category" });
  }

  try {
    const products = await Product.find({
      category: category.toLowerCase(),
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
