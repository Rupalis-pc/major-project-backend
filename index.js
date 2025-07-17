const { initializeDatabase } = require("./db/db.connect");
const express = require("express");
const cors = require("cors");
const Product = require("./model/products.model");
const Category = require("./model/categories.model");
const Wishlist = require("./model/wishlist.model");
const Cart = require("./model/cart.model");

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

app.get("/product/:productId", async (req, res) => {
  try {
    const product = await Product.findOne(req.params);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Product." });
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

app.get("/category/:categoryId", async (req, res) => {
  try {
    const category = await Category.findOne(req.params);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: "Category not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Category." });
  }
});

app.get("/wishlist", async (req, res) => {
  try {
    const wishlistIds = await Wishlist.find();
    if (wishlistIds.length >= 0) {
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
      res.status(404).json({
        error: "Failed to add product to wishlist, please try again!",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to post to wishlist, please try again!" });
  }
});

app.delete("/wishlist/:productId", async (req, res) => {
  try {
    const deleteId = await Wishlist.findOneAndDelete(req.params.productId);
    if (deleteId) {
      res.status(200).json({ message: "Id deleted successfully" });
    } else {
      res.status(404).json({ error: "Product not found in wishlist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product from wishlist" });
  }
});

app.get("/cart", async (req, res) => {
  try {
    const cartIds = await Cart.find();
    if (cartIds.length >= 0) {
      res.json(cartIds);
    } else {
      res.status(404).json({ error: "Product not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Cart." });
  }
});

app.post("/cart", async (req, res) => {
  try {
    const cartIds = new Cart(req.body);
    const saved = await cartIds.save();
    if (saved) {
      res.status(201).json({
        message: "Added to Cart",
        cartIds: saved,
      });
    } else {
      res.status(404).json({
        error: "Failed to add product to cart, please try again!",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to post to cart, please try again!" });
  }
});

app.delete("/cart/:productId", async (req, res) => {
  try {
    const deleteId = await Cart.findOneAndDelete(req.params.productId);
    if (deleteId) {
      res.status(200).json({ message: "Id deleted successfully" });
    } else {
      res.status(404).json({ error: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product from cart" });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on PORT", PORT);
});
