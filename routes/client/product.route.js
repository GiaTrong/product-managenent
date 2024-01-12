const express = require("express");
const router = express.Router();

const controller =
 require("../../controllers/client/product.controller");
// if you use express.Router => get "/" => products/
// get "/edit" => products/edit
//
router.get("/", controller.index);

router.get("/:slug", controller.detail);


// /edit => product/edit and RUN FUNCTION in controller has name
// is product

// EX:
// router.get("/edit", controller.edit);
// => http://localhost:3000/products/edit

module.exports = router;
