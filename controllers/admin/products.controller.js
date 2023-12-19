// [GET] /admin/dashboard

const Product = require("../../models/product.modal");

module.exports.index = async (req, res) => {
  // create buttons on BackEnd
  let filerStatus = [
    {
      name: "Tất cả",
      status: "",
      class: ""
    },
    {
      name: "Hoạt động",
      status: "active",
      class: ""
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: ""
    },
  ]

  // params: status => class: active in button
  if(req.query.status) {
    const index = filerStatus.findIndex(item => item.status == req.query.status)
    filerStatus[index].class = "active";
  } else {
    filerStatus[0].class = "active";
  }

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
