// module.exports.dashboard : dashboard is name of function
module.exports.dashboard = (req, res) => {
  res.render("admin/pages/dashboard/index", {
    pageTitle: "Trang tong quan"
  });
};
