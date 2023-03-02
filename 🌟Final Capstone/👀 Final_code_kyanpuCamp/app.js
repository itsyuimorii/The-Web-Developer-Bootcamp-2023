const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const joi = require("joi");

const Campground = require("./models/campground");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");

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

app.engine("ejs", ejsMate);
//write this middleware to setup view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//parse the body when using "req.body"
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  // Rendering our web page i.e. Demo.ejs
  // and passing title variable through it
  res.render("Demo", {
    title: "View Engine Demo",
  });
});

//list all campgrounds
app.get(
  "/campgrounds",
  catchAsync(async (req, res) => {
    const campgroundData = await Campground.find({});
    res.render("campgrounds/index", { campgroundData });
  })
);
//Create new campground
//this route must be exist before campgrounds/:id, as if it is after :id route, it will treat new as an id
app.get(
  "/campgrounds/new",
  catchAsync(async (req, res) => {
    res.render("campgrounds/new");
  })
);

//setup endpoint, when click`add campground` button as a post where the form is submitted to

app.post(
  "/campgrounds",
  catchAsync(async (req, res, next) => {
    //res.send(req.body);
    // if (!req.body.campground)
    //   throw new ExpressError("Invalid Campground Data", 400);
    const campgroundSchema = Joi.object({
      campground: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().required,
      }).required(),
    });
    const result = campgroundSchema.validate(req.body);
    res.send(result);
    //create a new model
    const campground = new Campground(req.body.campground);
    //console.log(campground);
    await campground.save();
    res.redirect(`/ campgrounds/${campground._id}`);
  })
);

//detail page for showing single campground
//id for looking up the corresponding campground from database
app.get(
  "/campgrounds/:id",
  catchAsync(async (req, res) => {
    const campgroundId = await Campground.findById(req.params.id);
    res.render("campgrounds/show", { campgroundId });
  })
);

//page for editing
app.get(
  "/campgrounds/:id/edit",
  catchAsync(async (req, res) => {
    //assume we found a id
    const campgroundId = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", { campgroundId });
  })
);

app.put(
  "/campgrounds/:id/",
  catchAsync(async (req, res) => {
    //res.send("IT WORKED!");
    //update the campground info
    const { id } = req.params;
    // const campground = await Campground.findByIdAndUpdate(id, { title: "test", location });/
    const campground = await Campground.findByIdAndUpdate(id, {
      ...req.body.campground,
    });
    res.redirect(`/campgrounds/${campground._id}`);
  })
);
//page for delete
app.delete(
  "/campgrounds/:id/",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
  })
);
//for every path call next()
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "something went wrong" } = err;
  res.status(statusCode).send(message);
});

//create a new campground testing in one of routes
/* app.get("/makeCampground", async (req, res) => {
  const camp = new Campground({
    title: "Campground Demo",
    description: "Testing the routes",
  });
  await camp.save();
  //res.send(camp);
});
 */
app.listen(8080, function (error) {
  if (error) throw error;
  console.log("listening on port http://127.0.0.1:8080");
});
