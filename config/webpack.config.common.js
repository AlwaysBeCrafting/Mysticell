const path = require("path");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const paths = require("./paths");
const publicPath = "/";

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    modules: [path.resolve(__dirname, "../src"), "node_modules"],
  },
  module: {
    rules: [
      /* SCSS rules can be found in dev and production configs */
      {
        test: /\.tsx?$/,
        include: paths.appSrc,
        use: [
          "react-hot-loader/webpack",
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              configFile: "tsconfig.app.json",
            },
          },
        ],
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: "file-loader",
        options: {
          name: "static/media/[name].[hash:8].[ext]",
        },
      },
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/media/[name].[hash:8].[ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new webpack.NamedModulesPlugin(),
  ],
  output: {
    path: paths.appDist,
    pathinfo: true,
    filename: "static/[name].js",
    chunkFilename: "static/[name].js",
    publicPath,
  },
};
