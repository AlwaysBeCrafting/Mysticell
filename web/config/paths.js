const path = require("path");
const appRootPath = require("app-root-path").path;

module.exports = {
  appRoot: appRootPath,
  appSrc: path.resolve(appRootPath, "./src"),
  appIndex: path.resolve(appRootPath, "./src/index.ts"),
  appDist: path.resolve(appRootPath, "./dist"),
  appHtml: path.resolve(appRootPath, "./public/index.html"),
};
