const express = require("express");
const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authenticateToken, async (req, res) => {
  console.log("🔵 /api/cart/add route hit");
  console.log("Received payload:", req.body);

  const { productId, name, img, price, quantity = 1 } = req.body;

  if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
    console.error("❌ Invalid or missing productId");
    return res.status(400).json({ message: "Invalid productId" });
  }

  if (typeof price !== "number" || isNaN(price)) {
    console.error("❌ Invalid price format");
    return res.status(400).json({ message: "Invalid price format" });
  }

  const userId = req.user._id;

  try {
    const convertedProductId = new mongoose.Types.ObjectId(productId);
    console.log("Converted Product ID:", convertedProductId);

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId: convertedProductId, name, img, price, quantity }],
      });
      console.log("🆕 Created new cart for user");
    } else {
      if (!Array.isArray(cart.items)) {
        cart.items = [];
      }

      const existingItem = cart.items.find(
        (item) =>
          item.productId &&
          item.productId.toString() === convertedProductId.toString()
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        console.log("🛒 Updated quantity for existing item");
      } else {
        cart.items.push({
          productId: convertedProductId,
          name,
          img,
          price,
          quantity,
        });
        console.log("➕ Added new item to cart");
      }
    }

    await cart.save();
    console.log("✅ Cart saved successfully:", cart);

    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error("❌ Error adding to cart:", error.message || error);
    res
      .status(500)
      .json({ message: "Server error", error: error.message || error });
  }
});

router.post("/decrease/:productId", authenticateToken, async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.productId;

  console.log("🔵 /api/cart/decrease route hit");
  console.log("Decreasing quantity for productId:", productId);

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      console.error("❌ Cart not found");
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!item || item.quantity <= 1) {
      console.error("❌ Cannot decrease quantity below 1");
      return res
        .status(400)
        .json({ message: "Cannot decrease quantity below 1" });
    }

    item.quantity -= 1;
    console.log("🛒 Decreased quantity of item:", item);

    await cart.save();

    console.log("✅ Cart updated after quantity decrease:", cart);
    return res.status(200).json({ message: "Quantity decreased", cart });
  } catch (error) {
    console.error("❌ Error decreasing quantity:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.delete("/remove/:productId", authenticateToken, async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.productId;

  console.log("🔵 /api/cart/remove route hit");
  console.log("Removing productId:", productId);

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      console.error("❌ Cart not found");
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    console.log("🛒 Item removed from cart. Updated items:", cart.items);

    await cart.save();

    console.log("✅ Cart updated after item removal:", cart);
    return res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.error("❌ Error removing item:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.delete("/clear", authenticateToken, async (req, res) => {
  const userId = req.user._id;

  console.log("🔵 /api/cart/clear route hit");

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      console.error("❌ Cart not found");
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    console.log("🛒 All items removed from cart");

    await cart.save();

    console.log("✅ Cart cleared:", cart);
    return res.status(200).json({ message: "Cart cleared", cart });
  } catch (error) {
    console.error("❌ Error clearing cart:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/", authenticateToken, async (req, res) => {
  const userId = req.user._id;

  console.log("🔵 /api/cart (GET) route hit");

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      console.error("❌ Cart not found for user");
      return res.status(200).json({ cart: { userId, items: [] } });
    }

    console.log("✅ Cart fetched:", cart);
    res.status(200).json({ cart });
  } catch (error) {
    console.error("❌ Error fetching cart:", error.message || error);
    res
      .status(500)
      .json({ message: "Server error", error: error.message || error });
  }
});

module.exports = router;
