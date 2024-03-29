// model database
const Product = require("../../models/product.modal");
// filter
const filerStatusHelper = require("../../helpers/filterStatus");
// search
const searchStatusHelper = require("../../helpers/search");
// pagination
const paginationHelper = require("../../helpers/pagination");
// config
const systemConfig = require("../../config/system");

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

  // END pagination

  // SORT
  let sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }
  // END SORT
  const products = await Product.find(find)
    .sort(sort) // sort FOLLOW 1 RECORD
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

  req.flash("success", "Cập nhạt trạng thái thành công");

  // chuyển hướng sang đâu đó
  // chuyền chữ BACK vào => TỰ ĐỘNG QUAY LẠI TRANG TRƯỚC ĐÓ
  res.redirect("back");
};

// [PATH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  console.log(req.body);
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash("success", "Cập nhật trạng thái thành công của nhiều sản phẩm");
      break;

    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash("success", "Cập nhật trạng thái thành công của nhiều sản phẩm");
      break;

    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        {
          deleted: "true",
          deletedAt: new Date(),
        }
      );
      break;

    case "change-position":
      //  console.log(ids)
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne(
          { _id: id },
          {
            position: position,
          }
        );
      }
      break;

    default:
      break;
  }

  res.redirect("back");
};

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  // console.log(req.params)

  // xóa như này là xóa vĩnh viễn
  // await Product.deleteOne({_id: id})

  // nên xóa MỀM => nghĩa là chỉ thay đổi cái phần mình muốn ko hiện ra thôi
  await Product.updateOne(
    { _id: id },
    {
      deleted: true,
      deletedAt: new Date(),
    }
  );

  res.redirect("back");
};

// [CREATE - GET] /admin/products/create
module.exports.create = async (req, res) => {
  // render viewer
  res.render("admin/pages/product/create", {
    pageTitle: "Thêm mới sản phẩm",
  });
};

// [CREATE - POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.stock = parseInt(req.body.stock);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);

  // case: POSITION : AUTO INCREASE
  if (req.body.position == "") {
    const countProduct = await Product.countDocuments();
    req.body.position = countProduct + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  // console.log(req.body);

  // image
  // Không đi vào thư mực public mà lại đi thẳng vào thư mục uploads luôn
  // console.log(req.file);
  // if (req.file) {
  //   req.body.thumbnail = `/uploads/${req.file.filename}`;
  // }
  //create new Product
  const product = new Product(req.body);
  // // saving in DATABASE
  await product.save();
  // render viewer
  // console.log(`${systemConfig.prefixAdmin}/products`)
  res.redirect(`${systemConfig.prefixAdmin}/products`);
};

// [EDIT - GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    //console.log(req.params) //:id => lấy ra được cái id
    const find = {
      deleted: false,
      _id: req.params.id,
    };

    const product = await Product.findOne(find);

    console.log(product);
    // render viewer
    res.render("admin/pages/product/edit", {
      pageTitle: "Chỉnh sửa sản phẩm",
      product: product,
    });
  } catch (error) {
    req.flash("error", "Cập nhật sản phẩm thất bại");
    req.redirect("back");
  }
};

// [EDIT - PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  console.log(req.body);

  req.body.price = parseInt(req.body.price);
  req.body.stock = parseInt(req.body.stock);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);

  // case: POSITION : AUTO INCREASE
  if (req.body.position == "") {
    const countProduct = await Product.countDocuments();
    req.body.position = countProduct + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  // image
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  //
  try {
    await Product.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", "Cập nhạt sp thành công");
  } catch (error) {
    req.flash("error", "Cập nhật sản phẩm thất bại");
  }
  // render viewer
  res.redirect(`back`);
};

// [DETAIL - GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };

    const product = await Product.findOne(find);
    console.log(product);
    res.render("admin/pages/product/detail", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    req.flash("error", "Truy cập sản phẩm thất bại");
    res.redirect("back");
  }
};
