const bodyParser = require("body-parser");
const express = require("express");

plantRouter = express.Router();

plantRouter.use(bodyParser.json());

plantRouter
  .route("/")
  .all((req, res, next) => {})
  .get((req, res, next) => {});

module.exports = plantRouter;
