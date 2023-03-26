const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const { reviewSchema, campgroundSchema } = require("./schemas.js");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const Review = require("./models/review");

const campgrounds = require("./routes/campgrounds");

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
app.use(express.static(path.join(__dirname, "public")));

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

app.use("/campgrounds", campgrounds);

app.get("/", (req, res) => {
  // Rendering our web page i.e. Demo.ejs
  // and passing title variable through it
  res.render("Demo", {
    title: "View Engine Demo",
  });
});

app.post(
  "/campgrounds/:id/reviews",
  validateReview,
  catchAsync(async (req, res) => {
    // res.send("POST review");
    //1. find our campground
    const campground = await Campground.findById(req.params.id);

    //2. require review model
    //3. get the review from show.ejs

    const review = new Review(req.body.review);
    //4. push review to reviews at campground models
    campground.reviews.push(review);

    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

app.delete(
  "/campgrounds/:id/reviews/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
    // res.send("Delete review");
  })
);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error", { err });
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
