const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  body: String,
  rating: Number,
});

//connect multiple reviews to one campground, so it is one to many relationship
module.exports = mongoose.model("Review", reviewSchema);
