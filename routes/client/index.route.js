const productRoutes = require("./product.route")
const homeRoutes = require("./home.route")

// cách export bên nodejs = EXPORT bên fe
module.exports = (app) => {
  // route: home
  app.use("/", homeRoutes);

  // use => which router is USE FOR ALL
  app.use("/products", productRoutes);
};
