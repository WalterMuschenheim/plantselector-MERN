var express = require("express");
var indexRouter = express.Router();
var path = require("path");

/* GET home page. */
indexRouter.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

module.exports = indexRouter;
