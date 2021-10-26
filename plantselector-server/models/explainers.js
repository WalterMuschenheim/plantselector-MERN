const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const explainerSchema = new Schema({
  name: String,
  imageURL: String,
  description: String,
  longDescription: String,
});

var Explainers = mongoose.model("Explainer", explainerSchema);

module.exports = Explainers;
