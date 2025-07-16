const fs = require("fs");

//read json file
const jsonData = fs.readFileSync("products.json", "utf-8");
const categoriesJsonData = fs.readFileSync("categories.json", "utf-8");

const productsData = JSON.parse(jsonData);
const categoriesData = JSON.parse(categoriesJsonData);

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
