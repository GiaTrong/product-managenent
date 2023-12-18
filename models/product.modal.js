const { default: mongoose, model } = require("mongoose");
// schema
// create a new model
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  deleted: Boolean,
});

// create Product from 
// - collection
// - model
// - name of collection which you need to give database
const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
