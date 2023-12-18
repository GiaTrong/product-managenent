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

  if(req.query.status) {
    const index = filerStatus.findIndex(item => item.status == req.query.status)
    filerStatus[index].class = "active";
  } else {
    filerStatus[0].class = "active";
  }
  // req: data in URL
  // query: products?status=active => {status:active}
  // console.log(req.query.status);

  // variable
  let find = {
    deleted: false,
  };

  // count STATUS IF YOU WANT TO find
  if (req.query.status) {
    find.status = req.query.status;
  }

  // give a data product
  const products = await Product.find(find);

  // console.log(products)

  res.render("admin/pages/product/index", {
    pageTitle: "Trang san pham",
    products: products,
    filerStatus: filerStatus,
  });
};
