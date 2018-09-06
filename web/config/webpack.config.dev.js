const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.config.common");

const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

const paths = require("./paths");
const publicPath = "/";

const serverPort = process.env.PORT;
const serverHost = process.env.HOST;
const serverUrl = `http://${serverHost}:${serverPort}`;

module.exports = merge(common, {
  devtool: "source-map",
  entry: {
    app: [
      "@babel/polyfill",
      "react-hot-loader/patch",
      `webpack-dev-server/client?${serverUrl}`,
      "webpack/hot/dev-server",
      paths.appIndex,
    ],
  },
  devServer: {
    hot: true,
    inline: false,
    quiet: true,
    port: serverPort,
    historyApiFallback: {
      disableDotRule: true,
    },
    publicPath,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Dev server running at ${serverUrl}`],
      },
    }),
  ],
});
