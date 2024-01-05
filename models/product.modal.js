const mongoose = require("mongoose");
// SLUG
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

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
  slug: {
    type: String,
    slug: "title",
    unique: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: Date,
}, {
  timestamps: true,
});

// create Product from
// - collection
// - model
// - name of collection which you need to give database
const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
