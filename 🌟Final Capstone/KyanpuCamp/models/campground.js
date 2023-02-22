const mongoose = require("mongoose");

const Schema = mongoose.Schema;

mongoose.connect("mongodb://127.0.0.1:27017/KyanpuCamp", {
  userNewUrlParser: true,
  userCreateIndex: true,
  useUnifiedTopology: true,
});

const CampgroundSchema = mongoose.Schema({
  title: String,
  price: String,
  description: String,
  location: String,
});

module.exports = mongoose.model("Campground", CampgroundSchema);
