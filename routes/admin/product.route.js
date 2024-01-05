const express = require("express");
const router = express.Router();

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
router.post("/create", controller.createPost);


module.exports = router;