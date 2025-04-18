const express = require("express");
const Cart = require("../models/Cart");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authenticateToken, async (req, res) => {
  const { productId, name, img, price, quantity = 1, userId } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, name, img, price, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, name, img, price, quantity });
      }
    }

    await cart.save();
    res.json({ message: "Product added to cart", cart });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

router.delete("/remove/:productId", authenticateToken, async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item._id.toString() !== productId);

    await cart.save();
    res.json({ message: "Item removed", cart });
  } catch (err) {
    console.error("Error removing item:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", authenticateToken, async (req, res) => {
  const userId = req.user._id;

  try {
    const userCart = await Cart.findOne({ userId });
    res.json({ cart: userCart?.items || [] });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/decrease/:productId", authenticateToken, async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((item) => item._id.toString() === productId);

    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart.items = cart.items.filter(
        (item) => item._id.toString() !== productId
      );
    }

    await cart.save();
    res.json({ message: "Quantity decreased", cart });
  } catch (err) {
    console.error("Error decreasing quantity:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/clear", authenticateToken, async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();

    res.json({ message: "Cart cleared", cart });
  } catch (err) {
    console.error("Error clearing cart:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
