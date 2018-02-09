const appRootPath = require("app-root-path").path;
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.config.common");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"],
        }),
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(["dist"], { root: appRootPath }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new ExtractTextPlugin("static/style.css"),
  ],
});
