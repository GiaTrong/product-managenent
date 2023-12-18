// [GET] /admin/dashboard

const Product = require("../../models/product.modal")

module.exports.index = async (req, res) => {
  // give a data product
  const products = await Product.find({
    deleted: false
  })

  // console.log(products)

  res.render("admin/pages/product/index", {
    pageTitle: "Trang san pham",
    products: products
  });
};
