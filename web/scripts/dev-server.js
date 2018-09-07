const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("../config/webpack.dev");

const port = +(process.env.PORT || 3000);
const host = process.env.HOST || "0.0.0.0";

const server = new WebpackDevServer(webpack(config), {
  hot: true,
  inline: false,
  port,
  publicPath: "/",
  historyApiFallback: true,
  quiet: true,
});

server.listen(port, host, err => {
  if (err) {
    console.error(err);
  }
  console.log(`Listening at http://${host}:${port}`);
});
