// cách  nhúng của bên express và bên nodejs
const express = require("express");
// override method
const methodOverride = require('method-override')
// body Parser
var bodyParser = require('body-parser')
// route client
const route = require("./routes/client/index.route");
// route admin
const routeAdmin = require("./routes/admin/index.route");
// use env
require("dotenv").config();

// use express
const app = express();
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
// port
const port = process.env.PORT;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// database
const database = require("./config/database");

// system config
const systemConfig = require("./config/system")

//run database
database.connect();

// use pug
app.set("views", "./views");
app.set("view engine", "pug");

//  APP VARIABLES LOCALS => thiết lập biến toàn cục cho cả app của bạn
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// nhúng file tĩnh
app.use(express.static("public"));

// Routes
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
