// cách  nhúng của bên express và bên nodejs
const express = require("express");
// display announce(thong bao)
const flash = require("express-flash");
// override method
const methodOverride = require("method-override");
// body Parser
const bodyParser = require("body-parser");
// cookie parser
const cookieParser = require('cookie-parser')
// session
const session = require("express-session");
// route client
const route = require("./routes/client/index.route");
// route admin
const routeAdmin = require("./routes/admin/index.route");
// use env
require("dotenv").config();

// use express
const app = express();
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
// port
const port = process.env.PORT;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// database
const database = require("./config/database");

// system config
const systemConfig = require("./config/system");

//run database
database.connect();

// use pug
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// FLASH
// cookieParser la 1 thu vien
app.use(cookieParser("fasfsdfsadfsadfsad")); // => save cookie
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// END FLASH

//  APP VARIABLES LOCALS => thiết lập biến toàn cục cho TẤT CẢ FILE BUG của bạn
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// khi lên file GLOBAL KO HIỂU THƯ MỤC "PUBLIC" như này
// => __dirname: chạy ra cấu trúc thư mục cho chúng ta
// nhúng file tĩnh
app.use(express.static(`${__dirname}/public`));

// Routes
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

