// [GET] /admin/dashboard
module.exports.index = (req, res) => {
  res.render("admin/pages/product/index", {
    pageTitle: "Trang san pham",
  });
};
