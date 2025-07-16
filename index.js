const { initializeDatabase } = require("./db/db.connect");
const express = require("express");
const fs = require("fs");
const Product = require("./model/products.model");
const Category = require("./model/categories.model");

initializeDatabase();

//read json file
const jsonData = fs.readFileSync("products.json", "utf-8");
const categoriesJsonData = fs.readFileSync("categories.json", "utf-8");
//convert in readable format
const productsData = JSON.parse(jsonData);
const categoriesData = JSON.parse(categoriesJsonData);

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

//seeding data
function seedProductsData() {
  try {
    for (const productData of productsData) {
      const newProduct = new Product({
        productId: productData.productId,
        categoryId: productData.categoryId,
        productName: productData.productName,
        productImage: productData.productImage,
        productRating: productData.productRating,
        categoryType: productData.categoryType,
        mrp: productData.mrp,
        productPrice: productData.productPrice,
        discount: productData.discount,
        theme: productData.theme,
        description: productData.description,
      });
      newProduct.save();
    }
  } catch (error) {
    console.log("Error seeding Data", error);
  }
}

function seedCategoriesData() {
  try {
    for (const categoryData of categoriesData) {
      const newCategory = new Category({
        categoryId: categoryData.categoryId,
        type: categoryData.type,
        imgUrl: categoryData.imgUrl,
        description: categoryData.description,
      });
      newCategory.save();
    }
  } catch (error) {
    console.log("Error seeding Data", error);
  }
}

// seedProductsData();

// seedCategoriesData();

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

app.listen(PORT, () => {
  console.log("Server is running on PORT", PORT);
});
