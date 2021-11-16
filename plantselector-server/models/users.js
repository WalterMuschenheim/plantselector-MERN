const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const roomSchema = new Schema({
  name: String,
  criteria: [[]],
});

roomSchema.virtual("nameAsKey").get(function () {
  return { [this.name]: { _id: this._id, criteria: this.criteria } };
});

const userSchema = new Schema({
  favorites: [String],
  rooms: [roomSchema],
});

userSchema.plugin(passportLocalMongoose);

// const Users = mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);
