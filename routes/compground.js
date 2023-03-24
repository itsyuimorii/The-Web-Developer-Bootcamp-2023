const express = require("express");
const router = express.Router();

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

router.post(
  "/campgrounds",
  validateCampground,
  catchAsync(async (req, res, next) => {
    // if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  })
);
//detail page for showing single campground
//id for looking up the corresponding campground from database
router.get(
  "/campgrounds/:id",
  catchAsync(async (req, res) => {
    const campgroundId = await Campground.findById(req.params.id).populate(
      "reviews"
    );
    console.log(campgroundId);
    res.render("campgrounds/show", { campgroundId });
  })
);

//page for editing
router.get(
  "/campgrounds/:id/edit",
  catchAsync(async (req, res) => {
    //assume we found a id
    const campgroundId = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", { campgroundId });
  })
);

router.put(
  "/campgrounds/:id/",
  validateCampground,
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
router.delete(
  "/campgrounds/:id/",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
  })
);
