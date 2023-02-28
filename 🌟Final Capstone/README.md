# 🏕 KYANPU_CAMP (キャンプ)

## 📍 01. Campgrounds CURD

## 💥. Creating the Basic Express App

> app.js

```js
const express = require("express");

const app = express();
 
app.listen(3000, () => {
  console.log("listening on port http://127.0.0.1:3000");
});
```

## 💥. what is Ejs

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

## 💥. Campground Model Bascis

### 1. Create the schema for the campground model

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

### 2. Create a new campground testing in one of routes

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

### 3. Check new database

```bash
mongosh
use Kyanpu-camp
db.campgrounds.find()
```

![db.find](https://github.com/itsyuimorii/The-Web-Developer-Bootcamp-2023/blob/main/%F0%9F%8C%9FFinal%20Capstone/images/db.find.png)

## 💥. Seeding Campground

**Setup some fake campgrounds seed data**

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

## 💥 Listing all campgrounds page

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

## 💥 Campground Show Router 

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

 ![list all camp](https://github.com/itsyuimorii/The-Web-Developer-Bootcamp-2023/blob/main/%F0%9F%8C%9FFinal%20Capstone/images/list%20all%20camp.png)

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

![show](https://github.com/itsyuimorii/The-Web-Developer-Bootcamp-2023/blob/main/%F0%9F%8C%9FFinal%20Capstone/images/show.png)

## 💥  Campground New & Create Router 

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

notes📝: `name="campground[title]"` -> This way of writing is for better classification 

![campground[title]](https://github.com/itsyuimorii/The-Web-Developer-Bootcamp-2023/blob/main/%F0%9F%8C%9FFinal%20Capstone/images/campground%5Btitle%5D.png)

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

![newcamp](https://github.com/itsyuimorii/The-Web-Developer-Bootcamp-2023/blob/main/%F0%9F%8C%9FFinal%20Capstone/images/new%20camp.png)

![parsebody](https://github.com/itsyuimorii/The-Web-Developer-Bootcamp-2023/blob/main/%F0%9F%8C%9FFinal%20Capstone/images/parsebody.png)

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

![new camp](https://github.com/itsyuimorii/The-Web-Developer-Bootcamp-2023/blob/main/%F0%9F%8C%9FFinal%20Capstone/images/new%20camp.png)

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

## 💥 Campground Edit & Update Router 

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

![edit](https://github.com/itsyuimorii/The-Web-Developer-Bootcamp-2023/blob/main/%F0%9F%8C%9FFinal%20Capstone/images/edit.png)

![succeesful](https://github.com/itsyuimorii/The-Web-Developer-Bootcamp-2023/blob/main/%F0%9F%8C%9FFinal%20Capstone/images/succeesful.png)

So we are making it to that put route with out `post request` that we are faking out express into thinking or into treating like its a`put request`

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

![campground[title]](https://github.com/itsyuimorii/The-Web-Developer-Bootcamp-2023/blob/main/%F0%9F%8C%9FFinal%20Capstone/images/update.png)

![update info](https://github.com/itsyuimorii/The-Web-Developer-Bootcamp-2023/blob/main/%F0%9F%8C%9FFinal%20Capstone/images/update%20info.png)

## 💥 Campground Delete Route

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

## 📍02. Express Middleware

### 1. Overview 

REQUEST ----->

- middleware are just function 
- each middlware has **access** to the `request` and `response` object
- middleware can **end the HTTP request** by sending back a ***response*** with methods like `res.send()`
- OR middleware can be **chained together**, one after antoher by calling `next()`

RESPONSE ----->

### 1. [morgan](https://github.com/expressjs/morgan)

```js
const morgan = require('morgan');

app.use(morgan('tiny'));
```

### 2. Using middleware one specific routes

> instead of using `app.use`, Routes HTTP GET requests to the specified path with the specified callback functions.

```js
app.get(path, callback [, callback ...])
```

| Argument   | Description                                                  | Default         |
| ---------- | ------------------------------------------------------------ | --------------- |
| `path`     | The path for which the middleware function is invoked; can be any of:A string representing a path.A path pattern.A regular expression pattern to match paths.An array of combinations of any of the above.For examples, see [Path examples](https://expressjs.com/en/5x/api.html#path-examples). | '/' (root path) |
| `callback` | Callback functions; can be:A middleware function.A series of middleware functions (separated by commas).An array of middleware functions.A combination of all of the above. |                 |

```js
....
const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'passwords') {
        next();
    }
    res.send("YOU NEED A PASSWORD!")
}

app.get('/secret', verifyPassword, (req, res) => {
    res.send('')
})
....
```

## 📍03. Adding Basic Styles

### 1. what is [EJS mate](https://github.com/JacksonTian/ejs-mate)

Given a template, index.ejs:
```js
<% layout('boilerplate') -%>
<h1>I am the <%= what %> template</h1>
```
And a layout, boilerplate.ejs:
```js
<!DOCTYPE html>
<html>
  <head>
    <title>It's <%= who %></title>
  </head>
  <body>
    <section>
      <%- body -%>
    </section>
  </body>
</html>
```

### 2. Installation

```js
$ npm install ejs-mate --save
```

### 3. notify app.js using `ejs-mate`

```js
const ejsMate = require("ejs-mate");

app.engine("ejs", ejsMate);
```

### 4. create `layout`

> views/layout/boillerplate.ejs

```html
<!DOCTYPE html>
<html lang="en">  
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KyanpuCamp</title>
  </head>  
  <body> 
      <h1>navbar placeholder</h1>
      <main><%- body %></main>
      <h1>footer placeholder</h1> 
  </body>
</html>
```

> views/campgrounds/index.ejs

```html
<% layout("layout/boilerplate") %>
  
<h1>All Campgrounds List</h1>
<div><a href="/campgrounds/new">Add new campground</a></div>
<ul>
  <% for (let campground of campgroundData) { %>
  <li>
    <a href="/campgrounds/<%=campground._id%>"><%=campground.title%></a>
  </li>
  <% } %>
</ul>
```

> as well as new.ejs / show.ejs / edit.ejs

### 5. Bootstrap 5.0

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Kyanpu Camp</title>

    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"
      integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I"
      crossorigin="anonymous"/>
  </head>

  <body>
    <%- include('../partials/navbar')%>
    <main class="container mt-5"><%- body %></main>
    <%- include('../partials/footer')%>

    <script
      src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
      integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
      crossorigin="anonymous"></script>
    <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js"
      integrity="sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/"
      crossorigin="anonymous"></script>
  </body>
</html>

```

### 	6. navbar an partials

> views/partials/navbar.ejs

```html
<nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">KyanpuCamp</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link" href="/">Home</a>
        <a class="nav-link" href="/campgrounds">Campgrounds</a>
        <a class="nav-link" href="/campgrounds/new">New Campground</a>
      </div>
    </div>
  </div>
</nav>
```

> views/partials/footer.ejs

```ejs
<footer class="footer bg-dark py-3 mt-auto">
  <div class="container">
    <span class="text-muted">&copy; Powered by itsyuimorii 2023</span>
  </div>
</footer>
```

> views/layout/boilerplate.ejs

```ejs
    <%- include('../partials/navbar')%>
    <main class="container mt-5"><%- body %></main>
    <%- include('../partials/footer')%>
```

- using flexbox

> views/layout/boilerplate.ejs

```js
  <body class="d-flex flex-column vh-100">
```

## 📍04. Adding images

> models/campground.js

```js
//add two more properties
const CampgroundSchema = new Schema({
  image: String,
  description: String,
});
```

>seeds/index.js

```js
const seedDB = async () => {
  await Campground.deleteMany({}); // Delete previous records
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collections/483251",
      description:
        "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
      price,
    });
    await camp.save();
  }
};
```

🚀if update the files -> **seeds or models**, **Be sure to update** in the command line : `node seeds/index.js`

```ejs
 <img src="<%= campgroundId.image %>" alt="">
 <p><%= campgroundId.description %></p>
 <p><a href="/campgrounds/<%=campgroundId._id%>/edit">Edit</a></p>
```

## 📍05. Update styling	

> views/campgrounds/new.ejs

```js
<% layout("layout/boilerplate") %>
<div class="row">
  <h1 class="text-center">⛺️ New Campground</h1>
  <div class="col-6 offset-3">
    <form action="/campgrounds" method="POST">
      <div class="mb-3">
        <label class="form-label" for="title">Title</label>
        <input
          class="form-control"
          type="text"
          id="title"
          name="campground[title]"
        />
      </div>
      <div class="mb-3">
        <label class="form-label" for="location">Location</label>
        <input
          class="form-control"
          type="text"
          id="location"
          name="campground[location]"
        />
      </div>
      <div class="mb-3">
        <label class="form-label" for="image">Image Url</label>
        <input
          class="form-control"
          type="text"
          id="image"
          name="campground[image]"
        />
      </div>
      <div class="mb-3">
        <label class="form-label" for="price">Campground Price</label>
        <div class="input-group">
          <span class="input-group-text" id="price-label">$</span>
          <input
            type="text"
            class="form-control"
            id="price"
            placeholder="0.00"
            aria-label="price"
            aria-describedby="price-label"
            name="campground[price]"
          />
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label" for="description">Description</label>
        <textarea
          class="form-control"
          type="text"
          id="description"
          name="campground[description]"
        ></textarea>
      </div>

      <div class="mb-3">
        <button class="btn btn-success">Add new campground</button>
      </div>
    </form>
    <a href="/campgrounds">All campgrounds list</a></div>
  </div>
</div>
```

> views/campgrounds/index.ejs

```js
<% layout("layout/boilerplate") %>
<h1>All Campgrounds List</h1>
<div><a href="/campgrounds/new">Add new campground</a></div>
<ul>
  <% for (let campground of campgroundData) { %>
  <div class="card" mb-3>
    <div class="row">
      <div class="col-md-4">
        <img class="img-fluid" alt="" src="<%=campground.image %>" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title"><%= campground.title %></h5>
          <p class="card-text"><%= campground.description %></p>
          <p class="card-text">
            <small class="text-muted"> <%= campground.location %> </small>
          </p>
          <a class="btn btn-primary" href="/campgrounds/<%=campground._id%>"
            >View <%= campground.title %>
          </a>
        </div>
      </div>
    </div>
  </div>

  <% } %>
</ul>

```

