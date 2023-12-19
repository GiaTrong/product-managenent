// [GET] /admin/dashboard

// model database
const Product = require("../../models/product.modal");
// filter
const filerStatusHelper = require("../../helpers/filterStatus");
// search
const searchStatusHelper = require("../../helpers/search");

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

  // search => return {
  // keyword: "...", regex: "..."
  // }
  const objectSearch = searchStatusHelper(req.query);
  // console.log(objectSearch)
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  //  END search

  // pagination
  let objectPagination = {
    currentPage: 1,
    limitItem: 4,
  };

  if (req.query.page) {
    objectPagination.currentPage = parseInt(req.query.page);
  }

  // skip = (trang hiện tại - 1) * số lượng phần tử mỗi trang
  objectPagination.skip =
    (objectPagination.currentPage - 1) * objectPagination.limitItem;

  // amount of page
  const countProduct = await Product.countDocuments(find);
  const totalPage = Math.ceil(countProduct / objectPagination.limitItem); 
  objectPagination.totalPage = totalPage;
  // console.log(totalPage)

  // END pagination

  // give a data product
  // .limit(number) => chỉ lấy tưng đấy sản phẩm thôi
  // skip: bỏ qua bao nhiêu sản phẩm
  const products = await Product.find(find)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);

  // console.log(products)

  // render viewer
  res.render("admin/pages/product/index", {
    pageTitle: "Trang san pham",
    products: products,
    filerStatus: filerStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination
  });
};
