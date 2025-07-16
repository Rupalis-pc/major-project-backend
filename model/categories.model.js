const mongoose = require("mongoose");

// Define Schema
const categoriesSchema = new mongoose.Schema(
  {
    categoryId: Number,
    type: String,
    imgUrl: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

//Define mongoose Model
const Categories = mongoose.model("Categories", categoriesSchema);

//export
module.exports = Categories;
