const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  criteria: [[]],
});

roomSchema.virtual("nameAsKey").get(function () {
  return { [this.name]: { _id: this._id, criteria: this.criteria } };
});

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: [String],
  rooms: [roomSchema],
});

var Users = mongoose.model("User", userSchema);

module.exports = Users;
