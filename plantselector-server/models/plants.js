const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plantSchema = new Schema({
  name: String,
  imageURL: String,
  description: String,
  longDescription: String,
  keywords: String,
  height: String,
  light: String,
  care: String,
});

var Plants = mongoose.model("Plant", plantSchema);

module.exports = Plants;
