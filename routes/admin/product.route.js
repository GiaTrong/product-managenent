const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/products.controller")

router.get("/", controller.index);

// :[name] => là 1 router động 
router.get("/change-status/:status/:id", controller.changeStatus);

module.exports = router;