const dashboardRoutes = require("./dashboard.route")
const systemConfig = require("../../config/system")

// cách export bên nodejs = EXPORT bên fe
module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  // route: admin
  app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);
};
