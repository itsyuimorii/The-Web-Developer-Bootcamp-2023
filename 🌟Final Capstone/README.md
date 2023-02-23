# 🏕 KYANPU_CAMP (キャンプ)

## 🚀 01. basic CRUD for Kyanpucamp

## 💥. Create basic server

> app.js

```js
const express = require("express");

const app = express();
 
app.listen(3000, () => {
  console.log("listening on port http://127.0.0.1:3000");
});
```

## 💥. Ejs

> views/home.ejs

```js
 <body>
    <!- For printing variable these
      tags are used: <%= %>
    -->
    <h1><%= title %></h1>

    <!- For business logic these
    tags are used: <% %>
    --> <% if(true){ %>
    <h4>Greetings from itsyuimorii</h4>
    <% } %>
  </body>
```

> app.js

```js
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
```

## 💥. create Campground model 

Create the schema for the campground model

> models/campground.js

```js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampgroundSchema = mongoose.Schema({
  //Add validations to the User model
  //+ username: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},

  title: String,
  price: String,
  description: String,
  location: String,
});

//first param is the name of db, second is the rule
module.exports = mongoose.model("Campground", CampgroundSchema);
```

connect mongoose 

> app.js

```js
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Kyanpu-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "database is connection error"));
db.once("open", () => {
  console.log("database is connected successfully");
});
```

## 💥. create a new campground testing in one of routes

> app.js

```js
app.get("/makecampground", async (req, res) => {
  const camp = new Campground({
    title: "Campground Demo",
    description: "Testing the routes",
  });
  await camp.save();
  res.send(camp);
});
```

![json](https://github.com/itsyuimorii/The-Web-Developer-Bootcamp-2023/blob/main/%F0%9F%8C%9FFinal%20Capstone/images/json.png)

Check database

```bash
mongosh
use Kyanpu-camp
db.campgrounds.find()
```

![db.find](/Users/yuimorii/Documents/GitHub/The-Web-Developer-Bootcamp-2023/🌟Final Capstone/images/db.find.png)

## 💥. setup some fake campgrounds seed data

> /seeds/index.js

```js
const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/Kyanpu-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

// Add a single message ~
// const seedDB = async () => {
//     await Campground.deleteMany({});// Delete previous records
//     const c = new Campground({ title: 'purple field' });//Add New Record
//     await c.save(); 

// array[Math.floor(Math.random() * array.length)], Generate a random number from 0 to array length - 1
const seedDB = async () => {
  await Campground.deleteMany({}); // Delete previous records
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
    });
    await camp.save();
  }
};
 // Disconnect mongoose after running
 seedDB().then(() => {
  mongoose.connection.close();
});

```

## 💥 listing all campgrounds page

> models/campground.js

```js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  title: String,
  price: String,
  description: String,
  location: String,
});

module.exports = mongoose.model("Campground", CampgroundSchema);
```

### 1. add new router

> app.js

`Campground.find({})` method to retrieve data from ` models/campground.js `

```js
app.get("/campgrounds", async (req, res) => {
  const campgroundData = await Campground.find({});
  res.render("campgrounds/index", { campgroundData });
});
```

### 2.  loop(all new campground site) from db

> /views/campgrounds/index.ejs

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>All campgrounds listing page</title>
  </head>
  <body>
    <h1>All campgrounds listing page</h1>
    <ul>
      <% for (let campground of campgroundData) { %>
      <li><%= campgroundData.title %></li>
      <% } %>
    </ul>
  </body>
</html>

```

## 💥 Show router 

> detail page for showing single campground

### 1. add new router

app.js

```js
//id for testing to look up the corresponding campground from database
app.get("/campgrounds/:id", async (req, res) => {
  res.render("campgrounds/show");
});
```

> views/campgrounds/show.ejs

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Show</title>
  </head>
  <body>
    <h1>Campground Detail page Testing!</h1>
  </body>
</html>
```

Enter the address in the browser plus any random id http://127.0.0.1:8080/campgrounds/42dlc9sjq, it will display Campground Detail Page Testing!

### 2. add link to each campgrouond

> views/campgrounds/index.ejs

index.ejs中有所有campground list, 在campground.title外層增加a標籤即可實現此效果, 

```js
<ul>
   <% for (let campground of campgroundData) { %>
   <li><a href="/campgrounds/<%= campground._id %>"><%= campground.title %></a></li>
   <% } %>
</ul>
```

 ![list all camp](/Users/yuimorii/Documents/GitHub/The-Web-Developer-Bootcamp-2023/🌟Final Capstone/images/list all camp.png)



### 3. findById and showing the campground data 

```js
app.get("/campgrounds/:id", async (req, res) => {
  const campgroundId = await Campground.findById(req.params.id);
  res.render("campgrounds/show", { campgroundId });
});
```

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Show</title>
  </head>
  <body>
    <h1>Campgrounds Detail pages</h1>
    <h2><%= campgroundId.title %></h2>
    <h2><%= campgroundId.location %></h2>
  </body>
</html>

```

![show](/Users/yuimorii/Documents/GitHub/The-Web-Developer-Bootcamp-2023/🌟Final Capstone/images/show.png)

## 💥 Create new campground

### 1. Create new route

```js

app.get("/campgrounds/new", async (req, res) => {
  res.render("campgrounds/new");
});
```

📝note: this route must be exist before campgrounds/:id, as it is new. this route must be exist before campgrounds/:id, as if it is after :id route, it will treat new as an id

### 2. create `new.ejs`, it is a form for user to input new campground info

> views/campgrounds/new.ejs

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <form action="/campgrounds" method="POST">
      <div>
        <label for="title">Title</label>
        <input type="text id="title" name="campground[title]">
        <label for="location">Location</label>
        <input type="text id="location" name="campground[location]">
        <button>Add campground</button>
      </div>
    </form>
  </body>
</html>
```

notes📝: `name="campground[title]"` -> 這種寫法是為了更好的分類 ![campground[title]](/Users/yuimorii/Documents/GitHub/The-Web-Developer-Bootcamp-2023/🌟Final Capstone/images/campground[title].png)

![new camp](/Users/yuimorii/Documents/GitHub/The-Web-Developer-Bootcamp-2023/🌟Final Capstone/images/newcampform.png)

### 3. Set the endpoint to set a POST request for the "form submission destination" when the "add Campground" button is clicked.

### 3.1 Testing body.parse

> app.js

```js
//parse the body when using "req.body"
app.use(express.urlencoded({ extended: true }));

app.post("./campgrounds", async (req, res) => {
  res.send(req.body);
});
```

![newcamp](/Users/yuimorii/Documents/GitHub/The-Web-Developer-Bootcamp-2023/🌟Final Capstone/images/newcampinfo.png)

![parsebody](/Users/yuimorii/Documents/GitHub/The-Web-Developer-Bootcamp-2023/🌟Final Capstone/images/parsebody.png)

### 3.2 After getting the data from the client side, create this new camp

```js
app.post("/campgrounds", async (req, res) => {
  //res.send(req.body);
  
  //take request of body campground instead of our route and submit that or create a new campground
  const campground = new Campground(req.body.campground);
  await campground.save(); //save data into database
  
  res.redirect(`/campgrounds/${campground._id}`);
});
```

![new camp](/Users/yuimorii/Documents/GitHub/The-Web-Developer-Bootcamp-2023/🌟Final Capstone/images/new camp.png)

### 3.3 add `<a href="">` to page

> views/campgrounds/index.ejs

```js
<div><a href="/campgrounds/new">Add new campground</a></div>
```

> views/campgrounds/show.ejs

```js
<footer>
  <a href="/campgrounds">All campgrounds List</a>
</footer>
```

>views/campgrounds/new.ejs

```js
<div><a href="/campgrounds">All campgrounds list</a></div>
```

## 💥Edit campground info

### 1. create new route

```js
//page for editing
app.get("/campgrounds/:id/edit", async (req, res) => {
  //assume we found a id, Editing info based on id
  const campgroundId = await Campground.findById(req.params.id);
  res.render("campgrounds/edit", { campgroundId });
});
```

### 2. create ejs file

> views/campgrounds/edit.ejs

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Edit campground</title>
  </head>
  <body>
    <h1>Edit campground</h1>
    <form action="/campgrounds/" method="POST">
      <div>
        <label for="title">Title</label>
        <input type="text id="title" name="campground[title]">
      </div>
      <div>
        <label for="location">Location</label>
        <input type="text id="location" name="campground[location]">
      </div>

      <button>Add new campground</button>
      <div>
        <a href="/campgrounds/<%= campgroundId._id %>">Back to Campground</a>
      </div>
    </form>
  </body>
</html>

```

> add `edit` link at `show.ejs`

```js
<p><a href="/campgrounds/<%=campgroundId._id%>/edit">Edit</a></p>
```

### 3. pre populate the values for titles and location

> views/campgrounds/edit.ejs

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Edit campground</title>
  </head>
  <body>
    <h1>Edit campground</h1>
    <form action="/campgrounds/" method="POST">
      <div>
        <label for="title">Title</label>
        <input type="text id="title" name="campground[title]" value="<%=
        campgroundId.title %>">
      </div>
      <div>
        <label for="location">Location</label>
        <input type="text id="location" name="campground[location]"value="<%=
        campgroundId.location %>">
      </div>

      <button>Update Campground</button>
      <div>
        <a href="/campgrounds/<%= campgroundId._id %>">Back to Campground</a>
      </div>
    </form>
  </body>
</html>
```

### 4. faking `post request` into put by using `method-override`

using this method to fake a put/patch

> app.js

```js
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.put("/campgrounds/:id/", async (req, res) => {
  res.send("IT WORKED!");
});
```

> views/campgrounds/edit.ejs

```JS
   <form action="/campgrounds/<%=campgroundId._id%>?_method=PUT" method="POST">
```

![edit](/Users/yuimorii/Documents/GitHub/The-Web-Developer-Bootcamp-2023/🌟Final Capstone/images/edit.png)

![succeesful](/Users/yuimorii/Documents/GitHub/The-Web-Developer-Bootcamp-2023/🌟Final Capstone/images/succeesful.png)

### 

**So we are making it to that put route with out `post request` that we are faking out express into thinking or into treating like its a`put request`**

### 4. update campground info

we need `id`,`req.body.campground` as a new data for that campground

```js
app.put("/campgrounds/:id/", async (req, res) => {
  //res.send("IT WORKED!");
  //update the campground info
  const { id } = req.params;
  // const campground = await Campground.findByIdAndUpdate(id, { title: "test", location });
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  res.redirect(`/campgrounds/${campground._id}`);
});
```

![campground[title]](/Users/yuimorii/Documents/GitHub/The-Web-Developer-Bootcamp-2023/🌟Final Capstone/images/update.png)

![update info](/Users/yuimorii/Documents/GitHub/The-Web-Developer-Bootcamp-2023/🌟Final Capstone/images/update info.png)

## 💥 Delete camp

> app.js

```js
//page for delete
app.delete("/campgrounds/:id/", async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect("/campgrounds");
});
```

> show.ejs

```js
    <p>
      <form action="/campgrounds/<%=campgroundId._id%>?_method=DELETE" method="POST">
        <button>Delete</button>
      </form>
    </p>
```

# 02. Express Middleware 

REQUEST ----->

- middleware are just function 
- each middlware has **access** to the `request` and `response` object
- middleware can **end the HTTP request** by sending back a ***response*** with methods like `res.send()`
- OR middleware can be **chained together**, one after antoher by calling `next()`

RESPONSE ----->

[morgan](https://github.com/expressjs/morgan)



