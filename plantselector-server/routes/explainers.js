const bodyParser = require("body-parser");
const express = require("express");
const cors = require("./cors");
const Explainers = require("../models/explainers");

explainerRouter = express.Router();

explainerRouter.use(bodyParser.json());

explainerRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Explainers.find({})
      .then(
        (users) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(users);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => next(err));
  });

module.exports = explainerRouter;
