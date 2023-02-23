const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/Kyanpu-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "database is connection error"));
db.once("open", () => {
  console.log("database is connected successfully");
});

//create app instance
const app = express();

//write this middleware to setup view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  // Rendering our web page i.e. Demo.ejs
  // and passing title variable through it
  res.render("Demo", {
    title: "View Engine Demo",
  });
});

//list all campgrounds
app.get("/campgrounds", async (req, res) => {
  const campgroundData = await Campground.find({});
  res.render("campgrounds/index", { campgroundData });
});

//detail page for showing single campground
//id for looking up the corresponding campground from database
app.get("/campgrounds/:id", async (req, res) => {
  res.render("campgrounds/show");
});

/* //create a new campground testing in one of routes
app.get("/makecampground", async (req, res) => {
  const camp = new Campground({
    title: "Campground Demo",
    description: "Testing the routes",
  });
  await camp.save();
  //res.send(camp);
}); */

app.listen(8080, function (error) {
  if (error) throw error;
  console.log("listening on port http://127.0.0.1:8080");
});
