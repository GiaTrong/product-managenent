const systemConfig = require("../../config/system")

// dashboard route
const dashboardRoutes = require("./dashboard.route")
// product route
const productRoutes = require("./product.route")

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  // route: admin
  app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);

  // /admin/products
  app.use(PATH_ADMIN + "/products", productRoutes);
};
