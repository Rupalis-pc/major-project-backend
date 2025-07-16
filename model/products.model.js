const mongoose = require("mongoose");

// Define Schema
const productSchema = new mongoose.Schema(
  {
    productId: String,
    categoryId: Number,
    productName: String,
    productImage: String,
    productRating: Number,
    categoryType: String,
    mrp: Number,
    productPrice: Number,
    discount: String,
    theme: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

//Define mongoose Model
const Product = mongoose.model("Product", productSchema);

//export
module.exports = Product;
