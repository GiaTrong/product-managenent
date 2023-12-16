// cách  nhúng của bên express và bên nodejs
const express = require("express");
const route = require("./routes/client/index.route");
require("dotenv").config();

// use express
const app = express();
// port
const port = process.env.PORT;

// database 
const database = require("./config/database")

//run database
database.connect();

// use pug
app.set("views", "./views");
app.set("view engine", "pug");

// nhúng file tĩnh
app.use(express.static("public"));

// Routes
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
