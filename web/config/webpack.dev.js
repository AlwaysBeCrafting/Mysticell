const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common");

const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");

const paths = require("./paths");
const publicPath = "/";

const serverPort = process.env.FRONTEND_WEB_PORT;
const serverHost = process.env.FRONTEND_WEB_HOST;
const serverUrl = `http://${serverHost}:${serverPort}`;

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  entry: {
    app: ["@babel/polyfill", paths.appIndex],
  },
  devServer: {
    hot: true,
    inline: false,
    quiet: true,
    host: serverHost,
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
    new CircularDependencyPlugin(),
  ],
});
