// model database
const Product = require("../../models/product.modal");
// filter
const filerStatusHelper = require("../../helpers/filterStatus");
// search
const searchStatusHelper = require("../../helpers/search");
// pagination
const paginationHelper = require("../../helpers/pagination");

// [GET] /admin/products
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

  // count products
  const countProduct = await Product.countDocuments(find);

  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItem: 4,
    },
    req.query,
    countProduct
  );
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
    pagination: objectPagination,
  });
};

// [PATH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  // render viewer
  const status = req.params.status;
  const id = req.params.id;

  // await Product.updateOne({_id} , {[cập nhật trường nào]})
  await Product.updateOne({ _id: id }, { status: status });

  // chuyển hướng sang đâu đó
  // chuyền chữ BACK vào => TỰ ĐỘNG QUAY LẠI TRANG TRƯỚC ĐÓ
  res.redirect("back");
};

// [PATH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      break;

    default:
      break;
  }

  res.redirect("back");
};
