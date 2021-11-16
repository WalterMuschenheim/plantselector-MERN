const bodyParser = require("body-parser");
const express = require("express");
const cors = require("./cors");
const mongoose = require("mongoose");
const authenticate = require("../authenticate");
const { response } = require("../app");

const userRouter = express.Router();

const Users = require("../models/users");

userRouter.use(bodyParser.json());

userRouter
  .route("/")
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Users.find()
      .exec()
      .then(
        (users) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(users);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

userRouter
  .route("/:userId")
  .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Users.findById(req.params.userId)
      .exec()
      .then(
        (user) => {
          const response = {};
          response.name = user.username;
          response.password = user.password;
          response.favorites = user.favorites;
          response.rooms = {};
          user.rooms.forEach((room) => {
            Object.assign(response.rooms, room.nameAsKey);
          });
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => next(err));
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Users.findByIdAndRemove(req.params.userId)
      .exec()
      .then(
        (user) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/HTML");
          res.end(`${user.name} has been deleted`);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => next(err));
  });

// userRouter
//   .route("/:userId/rooms")
//   .post(authenticate.verifyUser, (req, res, next) => {
//     Users.findById(req.params.userId)
//       .exec()
//       .then((user) => {
//         const room = { name: req.body.name, criteria: req.body.criteria };
//         user.rooms.push(room);
//         user
//           .save()
//           .then(
//             (user) => {
//               const response = {};
//               user.rooms.forEach((room) => {
//                 Object.assign(response, room.nameAsKey);
//               });
//               res.statusCode = 200;
//               res.setHeader("Content-Type", "application/json");
//               res.json(response);
//             },
//             (err) => {
//               next(err);
//             }
//           )
//           .catch((err) => next(err));
//       });
//   })
//   .get(authenticate.verifyUser, (req, res, next) => {
//     Users.findById(req.params.userId)
//       .exec()
//       .then(
//         (user) => {
//           const response = {};
//           user.rooms.forEach((room) => {
//             Object.assign(response, room.nameAsKey);
//           });
//           res.statusCode = 200;
//           res.setHeader("Content-Type", "application/json");
//           res.json(response);
//         },
//         (err) => {
//           next(err);
//         }
//       )
//       .catch((err) => next(err));
//   });

// userRouter
//   .route("/:userId/rooms/:roomId")
//   .get(authenticate.verifyUser, (req, res, next) => {
//     Users.findById(req.params.userId)
//       .exec()
//       .then(
//         (user) => {
//           res.statusCode = 200;
//           res.setHeader("Content-Type", "application/json");
//           res.json(user.rooms.id(req.params.roomId).nameAsKey);
//         },
//         (err) => {
//           next(err);
//         }
//       )
//       .catch((err) => next(err));
//   })
//   .delete(authenticate.verifyUser, (req, res, next) => {
//     Users.findById(req.params.userId)
//       .exec()
//       .then((user) => {
//         if (user != null) {
//           user.rooms.id(req.params.roomId).remove();
//           return user.save();
//         } else {
//           err = new Error("user not found");
//         }
//       })
//       .then(
//         (user) => {
//           const response = {};
//           user.rooms.forEach((room) => {
//             Object.assign(response, room.nameAsKey);
//           });
//           res.statusCode = 200;
//           res.setHeader("Content-Type", "application/json");
//           res.json(response);
//         },
//         (err) => {
//           next(err);
//         }
//       )
//       .catch((err) => next(err));
//   });

// userRouter
//   .route("/:userId/favorites")
//   .post(authenticate.verifyUser, (req, res, next) => {
//     Users.findById(req.body.userId)
//       .exec()
//       .then((user) => {
//         user.favorites.push(req.body.plantName);
//         return user.save();
//       })
//       .then(
//         (user) => {
//           res.json(user.favorites);
//         },
//         (err) => {
//           next(err);
//         }
//       )
//       .catch((err) => next(err));
//   });

// userRouter
//   .route("/:userId/favorites/:favorite")
//   .delete(authenticate.verifyUser, (req, res, next) => {
//     Users.findById(req.params.userId)
//       .exec()
//       .then((user) => {
//         if (user != null) {
//           const plantIndex = users.favorites.indexOf(req.params.favorite);
//           user.favorites.splice(plantIndex, 1);
//           return user.save();
//         } else {
//           err = new Error("user not found");
//         }
//       })
//       .then(
//         (user) => {
//           res.json(user.favorites);
//         },
//         (err) => {
//           next(err);
//         }
//       )
//       .catch((err) => next(err));
//   });

module.exports = userRouter;

// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;
