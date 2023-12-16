const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/home.controller")
// if you use express.Router => get "/" => /
// get "/edit" => /edit
// 
router.get("/", controller.index);

module.exports = router;