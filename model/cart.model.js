const mongoose = require("mongoose");

// Define Schema
const cartSchema = new mongoose.Schema(
  {
    productId: String,
  },
  {
    timestamps: true,
  }
);

//Define mongoose Model
const Cart = mongoose.model("Cart", cartSchema);

//export
module.exports = Cart;
