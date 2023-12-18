// [GET] /
// module.exports.index : index is name of function
module.exports.index = (req, res) => {
  res.render("client/pages/home/index", {
    // cứ chỗ nào dùng pug => là dùng được biến pageTitle
    pageTitle: "Trang chu"
  });
};
