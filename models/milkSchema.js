const mongoose = require("mongoose");

const milkSchema = new mongoose.Schema({
  name: {
    type: String,
    uppercase: true,
    trim: true,
    required: true,
  },
  multiplier: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    default: "white",
  },
  _id: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Milk", milkSchema);
