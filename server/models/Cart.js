const mongoose = require("mongoose");
const User = require("./User");

const cartItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  items: {
    type: [
      {
        productId: Number,
        name: String,
        img: String,
        price: Number,
        quantity: Number,
      },
    ],
    default: [],
  },
});

const Cart = mongoose.model("Cart", cartItemSchema);

module.exports = Cart;
