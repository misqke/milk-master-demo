const mongoose = require("mongoose");

const connectDB = (db) => {
  mongoose.connect(db, () => console.log("connected to data base..."));
};

module.exports = connectDB;
