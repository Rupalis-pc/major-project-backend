const mongoose = require("mongoose");

// Define Schema
const addressSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    address: String,
    address2: String,
    city: String,
    state: String,
    zip: Number,
  },
  {
    timestamps: true,
  }
);

//Define mongoose Model
const Address = mongoose.model("Address", addressSchema);

//export
module.exports = Address;
