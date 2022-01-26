const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  url: String,
  _id: String,
});

module.exports = mongoose.model("Image", ImageSchema);
