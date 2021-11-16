const bodyParser = require("body-parser");
const express = require("express");
const cors = require("./cors");
const mongoose = require("mongoose");
const passport = require("passport");
const authenticate = require("../authenticate");
const { response } = require("../app");

const profileRouter = express.Router();

const Users = require("../models/users");

profileRouter.use(bodyParser.json());

profileRouter
  .route("/signup")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post(cors.corsWithOptions, (req, res, next) => {
    Users.register(
      new Users({ username: req.body.username }),
      req.body.password,
      (err, user) => {
        console.log(user);
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.json({ err: err });
        } else {
          passport.authenticate("local")(req, res, () => {
            console.log(req.user);
            const token = authenticate.getToken({ _id: req.user._id });
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ user: req.user, token: token });
          });
        }
      }
    );
  });

profileRouter
  .route("/login")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post(
    cors.corsWithOptions,
    passport.authenticate("local", { failureFlash: true }),
    (req, res, next) => {
      console.log(req.user);
      const token = authenticate.getToken({ _id: req.user._id });
      const response = {};
      response.username = req.user.username;
      response.password = req.user.password;
      response.favorites = req.user.favorites;
      response.rooms = {};
      req.user.rooms.forEach((room) => {
        Object.assign(response.rooms, room.nameAsKey);
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        user: response,
        token: token,
      });
    }
  );

profileRouter
  .route("/logout")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Users.findById(req.user._id).then((user) => {
      req.logout();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        logout: true,
        logoutmessage: `${user.username} has been logged out`,
      });
    });
  });

profileRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Users.findById(req.user._id)
      .exec()
      .then(
        (user) => {
          const response = {};
          response.username = user.username;
          response.password = user.password;
          response.favorites = user.favorites;
          response.rooms = {};
          user.rooms.forEach((room) => {
            Object.assign(response.rooms, room.nameAsKey);
          });
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ user: response });
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => next(err));
  })
  .put()
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Users.findByIdAndRemove(req.user._id)
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

profileRouter
  .route("/rooms")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Users.findById(req.user._id)
      .exec()
      .then((user) => {
        const room = { name: req.body.name, criteria: req.body.criteria };
        user.rooms.push(room);
        user
          .save()
          .then(
            (user) => {
              console.log(user.rooms);
              const response = {};
              user.rooms.forEach((room) => {
                Object.assign(response, room.nameAsKey);
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
  })
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Users.findById(req.user._id)
      .exec()
      .then(
        (user) => {
          const response = {};
          user.rooms.forEach((room) => {
            Object.assign(response, room.nameAsKey);
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

profileRouter
  .route("/rooms/:roomId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Users.findById(req.user._id)
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
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Users.findById(req.user._id)
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
          const response = {};
          user.rooms.forEach((room) => {
            Object.assign(response, room.nameAsKey);
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

profileRouter
  .route("/favorites")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Users.findById(req.user._id)
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

profileRouter
  .route("/favorites/:favorite")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Users.findById(req.user._id)
      .exec()
      .then((user) => {
        if (user != null) {
          const plantIndex = user.favorites.indexOf(req.params.favorite);
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

module.exports = profileRouter;
