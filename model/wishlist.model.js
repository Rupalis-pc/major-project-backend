const mongoose = require("mongoose");

// Define Schema
const wishlistSchema = new mongoose.Schema(
  {
    productId: String,
  },
  {
    timestamps: true,
  }
);

//Define mongoose Model
const Wishlist = mongoose.model("Wishlist", wishlistSchema);

//export
module.exports = Wishlist;
