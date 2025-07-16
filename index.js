const { initializeDatabase } = require("./db/db.connect");
const express = require("express");
const cors = require("cors");
const Product = require("./model/products.model");
const Category = require("./model/categories.model");
const Wishlist = require("./model/wishlist.model");

initializeDatabase();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.get("/products", async (req, res) => {
  try {
    const productList = await Product.find();
    if (productList.length > 0) {
      res.json(productList);
    } else {
      res.status(404).json({ error: "Products not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Products." });
  }
});

app.get("/categories", async (req, res) => {
  try {
    const categoryList = await Category.find();
    if (categoryList.length > 0) {
      res.json(categoryList);
    } else {
      res.status(404).json({ error: "Categories not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Categories." });
  }
});

app.get("/wishlist", async (req, res) => {
  try {
    const wishlistIds = await Wishlist.find();
    if (wishlistIds.length > 0) {
      res.json(wishlistIds);
    } else {
      res.status(404).json({ error: "Wishlist not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Wishlist." });
  }
});

app.post("/wishlist", async (req, res) => {
  try {
    const wishlistIds = new Wishlist(req.body);
    const saved = await wishlistIds.save();
    if (saved) {
      res.status(201).json({
        message: "Added to Wishlist",
        wishlistIds: saved,
      });
    } else {
      res
        .status(404)
        .json({
          error: "Failed to add product to wishlist, please try again!",
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add product to wishlist, please try again!" });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on PORT", PORT);
});
