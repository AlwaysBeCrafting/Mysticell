const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const paths = require("./paths");

module.exports = merge(common, {
  entry: {
    app: ["@babel/polyfill", paths.appIndex],
  },
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
    new CleanWebpackPlugin(["dist"], { root: paths.appRoot }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new MiniCssExtractPlugin({ filename: "static/[name].css" }),
    new UglifyJsPlugin(),
  ],
});
