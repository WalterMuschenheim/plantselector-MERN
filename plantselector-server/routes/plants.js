const bodyParser = require("body-parser");
const express = require("express");
const cors = require("./cors");
const Plants = require("../models/plants");
const { response } = require("../app");

plantRouter = express.Router();

plantRouter.use(bodyParser.json());

plantRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Plants.find({})
      .then(
        (plants) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(plants);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, (req, res, next) => {
    Plants.create(req.body)
      .then(
        (plant) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(plant);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => next(err));
  });

plantRouter
  .route("/:plantId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .put(cors.corsWithOptions, (req, res, next) => {
    Plants.findByIdAndUpdate(req.params.plantId, { $set: req.body })
      .then(
        (plants) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(plants);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => next(err));
  })
  .delete(cors.corsWithOptions, (req, res, next) => {
    Plants.findByIdAndRemove(req.params.plantId)
      .then(
        (response) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => next(err));
  });
module.exports = plantRouter;
