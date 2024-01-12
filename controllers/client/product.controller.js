// [GET] /products
const Product = require("../../models/product.modal");

//[GET] module.exports.index : index is name of function
module.exports.index = async (req, res) => {
  // give all products in database
  const products = await Product.find({
    // status: "active",
    // deleted: false,
  }).sort({ position: "desc" });
  // console.log(products);

  // give a new price
  const newProducts = products.map((item) => {
    item.priceNew = (
      (item.price * (100 - item.discountPercentage)) /
      100
    ).toFixed(0);

    return item;
  });

  // render in viewer
  res.render("client/pages/products/index", {
    pageTitle: "Danh sach san pham",
    products: newProducts,
  });
};

//[GET] module.exports.index : index is name of function
module.exports.detail = async (req, res) => {
  try {
    const product = await Product.findOne({
      deleted: false,
      status: "active",
      slug: req.params.slug,
    });
    console.log(product);

    // render in viewer
    res.render("client/pages/products/detail", {
      pageTitle: "Chi tiet san pham",
      product: product,
    });
  } catch (error) {
    res.redirect("back");
  }
};
