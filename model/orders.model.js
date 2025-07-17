const mongoose = require("mongoose");

// Define Schema
const itemSchema = new mongoose.Schema({
  productId: String,
  productName: String,
  productPrice: Number,
  quantity: Number,
});

const addressSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  address: String,
  address2: String,
  city: String,
  state: String,
  zip: Number,
});

const orderSchema = new mongoose.Schema(
  {
    orderId: Number,
    items: [itemSchema],
    total: Number,
    address: [addressSchema],
    date: String,
  },
  {
    timestamps: true,
  }
);

//Define mongoose Model
const Order = mongoose.model("Order", orderSchema);

//export
module.exports = Order;
