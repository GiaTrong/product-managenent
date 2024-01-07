const express = require("express");
const router = express.Router();

// multer - up image in web
const storageMulter = require("../../helpers/storageMulter")
console.log(storageMulter())
const multer  = require('multer')
const upload = multer({ storage:  storageMulter() })
// dest: link to WHERE save image

const controller = require("../../controllers/admin/products.controller")

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
router.post("/create", upload.single('thumbnail'), controller.createPost);


module.exports = router;