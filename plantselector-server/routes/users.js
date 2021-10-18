const bodyParser = require("body-parser");
const express = require("express");

userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter
  .route("/")
  .all((req, res, next) => {})
  .get((req, res, next) => {})
  .post((req, res, next) => {});

userRouter
  .route("/:user")
  .all((req, res, next) => {})
  .get((req, res, next) => {})
  .delete((req, res, next) => {});

userRouter
  .route("/:user/rooms")
  .all((req, res, next) => {})
  .get((req, res, next) => {})
  .post((req, res, next) => {});

userRouter
  .route("/:user/rooms/:room")
  .all((req, res, next) => {})
  .delete((req, res, next) => {});

userRouter
  .route("/:user/favorites")
  .all((req, res, next) => {})
  .get((req, res, next) => {})
  .post((req, res, next) => {});

userRouter
  .route("/:userName/favorites/:favorite")
  .all((req, res, next) => {})
  .delete((req, res, next) => {});

module.exports = router;

// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;
