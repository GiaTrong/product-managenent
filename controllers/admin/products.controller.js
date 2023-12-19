// [GET] /admin/dashboard

// model database
const Product = require("../../models/product.modal");
// filter
const filerStatusHelper = require("../../helpers/filterStatus")

module.exports.index = async (req, res) => {
  
  // FILTER => tách hẳn thằng filter ra 1 cái module riêng để
  // reuse cho dễ
  const filerStatus = filerStatusHelper(req.query);

  // req: data in URL
  // query: LẤY PARAMS
  // console.log(req.query.status);

  // condition to filter data
  let find = {
    deleted: false,
  };

  // search STATUS IF YOU WANT TO find
  if (req.query.status) {
    find.status = req.query.status;
  }

  // INPUT
  // muốn tìm mà ko cần phải fix cứng giống hệt => REGEX
  let keyword = "";
  if(req.query.keyword) {
    keyword = req.query.keyword;

    const regex = new RegExp(keyword, "i"); // "i": tham số thứ 2, KHÔNG PHÂN BIỆT HOA THƯỜNG
    find.title = regex;
  }

  // give a data product
  const products = await Product.find(find);

  // console.log(products)

  // render viewer
  res.render("admin/pages/product/index", {
    pageTitle: "Trang san pham",
    products: products,
    filerStatus: filerStatus,
    keyword: keyword
  });
};
