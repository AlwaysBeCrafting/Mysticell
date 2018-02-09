const path = require("path");
const express = require("express");
const appRootPath = require("app-root-path").path;

const app = express();

const distPath = path.resolve(appRootPath, "dist");

app.use("/static", express.static(path.resolve(distPath, "static")));

app.get("/*", (req, res, next) => {
  res.sendFile(path.resolve(distPath, "index.html"));
});

app.listen(process.env.PORT || 8080);
