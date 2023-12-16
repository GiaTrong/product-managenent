// module.exports.index : index is name of function
module.exports.index = (req, res) => {
  res.render("client/pages/products/index", {
    pageTitle: "Danh sach san pham"
  });
};
