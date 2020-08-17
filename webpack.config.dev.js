const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
require("dotenv").config();
module.exports = merge(baseConfig, {
  mode: "development",
  devServer: {
    port: 9000
  },
  devtool: "source-map"
});
