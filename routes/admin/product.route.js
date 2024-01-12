const express = require("express");
const router = express.Router();

// multer - up image in web
const storageMulter = require("../../helpers/storageMulter");
console.log(storageMulter());
const multer = require("multer");
const upload = multer({ storage: storageMulter() });
// dest: link to WHERE save image

// controller
const controller = require("../../controllers/admin/products.controller");

// validate
const validate = require("../../validate/admin/productValidate");

// [GET]
router.get("/", controller.index);

// người dùng truy cập vào phương thức get => mới chạy được
// router.get("/change-status/:status/:id", controller.changeStatus);

// :[name] => là 1 router động
// ĐÚNG ROUTER + đúng PHƯƠNG THỨC
router.patch("/change-status/:status/:id", controller.changeStatus);

// [PATCH]
router.patch("/change-multi", controller.changeMulti);

// [DELETE]
router.delete("/delete/:id", controller.deleteItem);

// [GET]
router.get("/create", controller.create);

// [POST]
// thumbnail: is link of image
router.post(
  "/create",
  upload.single("thumbnail"),
  validate.createPost,
  controller.createPost
);

// [GET] /admin/products/edit
router.get("/edit/:id", controller.edit);

// [PATCH] /admin/products/edit
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  validate.createPost,
  controller.editPatch
);

// [GET] /admin/detail/edit/:id
router.get("/detail/:id", controller.detail);

module.exports = router;
