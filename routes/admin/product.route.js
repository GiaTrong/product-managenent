const express = require("express");
const router = express.Router();

// multer - up image in web
const multer = require("multer");
//cloudinary
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// cloudinary
cloudinary.config({
  cloud_name: "dlhv6hvmt",
  api_key: "984175223189694",
  api_secret: "wRKkaGQAFdzA-qteoBCztkdIp10",
});
//end cloudinary
const upload = multer();

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
  function (req, res, next) {
    if (req.file) {
      let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          });
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      async function upload(req) {
        let result = await streamUpload(req);
        console.log(result);
        req.body[req.file.fieldname] = result.secure_url;
        next();
      }

      upload(req);
    } else {
      next();
    }
  },
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
