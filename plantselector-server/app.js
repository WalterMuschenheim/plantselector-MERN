const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const authenticate = require("./authenticate");
const dummyData = require("./dummyData");
const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
const plantRouter = require("./routes/plants");
const explainerRouter = require("./routes/explainers");
const profileRouter = require("./routes/profile");
const Users = require("./models/users");
const Plants = require("./models/plants");
const Explainers = require("./models/explainers");
const config = require("./config");
const url = config.mongoUrl;
const connect = mongoose.connect(url);
connect.then((db) => {
  console.log("connected correctly to database");
  // return Plants.remove({}).then((plants) => {
  //   return Explainers.remove({});
  // });
});

dummyData(connect);

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser("12345-67890-09876-54321"));
app.use(express.static(path.join(__dirname, "public")));

// passport
app.use(passport.initialize());

// routes
app.use("/", indexRouter);
app.use("/plants", plantRouter);
app.use("/explainers", explainerRouter);
app.use("/profile", profileRouter);
app.use("/users", userRouter);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
