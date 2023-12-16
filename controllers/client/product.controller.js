const Product = require("../../models/product.modal");

// module.exports.index : index is name of function
module.exports.index = async (req, res) => {
  // give all products in database
  const products = await Product.find({
    // status: "active",
    // deleted: true
  });
  console.log(products);

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
