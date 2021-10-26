const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const userRouter = express.Router();

const Users = require("../models/users");

userRouter.use(bodyParser.json());

userRouter
  .route("/")
  .get((req, res, next) => {
    Users.find()
      .exec()
      .then((users) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(users);
      });
  })
  .post((req, res, next) => {
    Users.create(req.body)
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

userRouter
  .route("/:userId")
  .get((req, res, next) => {
    Users.findById(req.params.userId)
      .exec()
      .then(
        (user) => {
          const objectRooms = {};
          user.rooms.forEach((room) => {
            objectRooms[room.name] = {
              criteria: room.criteria,
              _id: room._id,
            };
          });
          user.rooms = objectRooms;
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(objectRooms);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {});

userRouter
  .route("/:userId/rooms")
  .post((req, res, next) => {
    Users.findById(req.params.userId)
      .exec()
      .then((user) => {
        const room = { name: req.body.name, criteria: req.body.criteria };
        user.rooms.push(room);
        user
          .save()
          .then(
            (user) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(user.rooms.map((room) => room.nameAsKey));
            },
            (err) => {
              next(err);
            }
          )
          .catch((err) => next(err));
      });
  })
  .get((req, res, next) => {
    Users.findById(req.params.userId)
      .exec()
      .then(
        (user) => {
          let response = {};
          user.rooms.forEach((room) => {
            response = { ...response, room.nameAsKey };
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
  });

userRouter
  .route("/:userId/rooms/:roomId")
  .get((req, res, next) => {
    Users.findById(req.params.userId)
      .exec()
      .then(
        (user) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(user.rooms.id(req.params.roomId).nameAsKey);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Users.findById(req.params.userId)
      .exec()
      .then((user) => {
        if (user != null) {
          user.rooms.id(req.params.roomId).remove();
          return user.save();
        } else {
          err = new Error("user not found");
        }
      })
      .then(
        (user) => {
          res.json(user.rooms.map((room) => room.nameAsKey));
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => next(err));
  });

userRouter.route("/:userId/favorites").post((req, res, next) => {
  Users.findById(req.body.userId)
    .exec()
    .then((user) => {
      user.favorites.push(req.body.plantName);
      return user.save();
    })
    .then(
      (user) => {
        res.json(user.favorites);
      },
      (err) => {
        next(err);
      }
    )
    .catch((err) => next(err));
});

userRouter.route("/:userId/favorites/:favorite").delete((req, res, next) => {
  Users.findById(req.params.userId)
    .exec()
    .then((user) => {
      if (user != null) {
        const plantIndex = users.favorites.indexOf(req.params.favorite);
        user.favorites.splice(plantIndex, 1);
        return user.save();
      } else {
        err = new Error("user not found");
      }
    })
    .then(
      (user) => {
        res.json(user.favorites);
      },
      (err) => {
        next(err);
      }
    )
    .catch((err) => next(err));
});

module.exports = userRouter;

// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;
