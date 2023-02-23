# 🏕 KYANPU_CAMP (キャンプ)

### 🔑 Introduction

KYANPU*CAMP is a website where users can discover campgrounds. This project was part of \_Colt Steele's web dev course on udemy.*

### 📰Certificate

> ![check50.png](https://github.com/itsyuimorii/The-Web-Developer-Bootcamp-2023/blob/main/Images/check50.png.jpeg)

### 📝Notes

> [View More Notes](https://github.com/itsyuimorii/The-Web-Developer-Bootcamp-2023/blob/main/NOTES.md)

### 💻 Features:

Users cannot manage posts and view user profiles without authentication, nor can they edit or delete posts and comments created by other users

- ✂️**Create, read, update, delete** campsites and campsite reviews
- 🪪**Manage account** Options for users to edit their profile or delete their account
- 🤖Creation of routes with **authentication**
- ⚡️**User profile** includes more information about the user (full name, email, phone, join date)
- 🔎**Search** for campgrounds by name or location
- 📚**Sort** campgrounds (ratings, reviews and prices)
- 🧩[Google Maps API](https://developers.google.com/maps/documentation)
- 💎Create and update forms with client-side and server-side **validation**

### ⚙️ Built With

This project was created using Node.js, Express, MongoDB, and Bootstrap. Passport.js was used to handle authentication.

- 🪄**Node.js** used as environment for writing server-side code
- 🗑RESTful routing using express and mongoose
- 🤖 Express **Cookie-Session** middleware
- 📢Templating Node.js applications with **EJS**
- 🔎Responsive sites with **Bootstrap** allowed _mobile_ friendly
- 🚧 Express **method-override** middleware to handle update and delete features
- 💾 Non-relational database (**MongoDB**)
- **📫Mongoose** for configuring MongoDB models
- ⚡️Using the **"Flash" middleware** allows the user to send information (objects, arrays, etc.) to the request to which the user wants to be redirected.
- 🔐 Deploying applications to **Heroku** and databases to MongoDB Atlas
- 🔬Database hosted on **mLab**
- **💳passport.js** for password hash and salt
- 📍Geocoder with **Google Maps API** for rendering locations of campsites

### 🚀 Getting Started

- Install [mongodb](https://www.mongodb.com/)
- Create a cloudinary account to get an API key and secret code
  ```
  git clone https://github.com/itsyuimorii/Kyanpu-camp.git
  cd Kyanpucamp
  npm init -y
  ```

### 🏗️ Dependencies

```
  "express": $ npm install express
  "ejs": $ npm install ejs-mate
  "Schemas": $ npm install -g schemas
  "method-override: $ npm install method-override
  "mongoose": $ npm install mongoose
  "geocoder":
  "connect-flash": $ npm install connect-flash
  "Path": $ npm install --save path
  "express-session": $ npm install express-session
  "passport"
  "passport-local"
  "passport-local-mongoose"
```

### 📣 Acknowledgments

The skeleton of this project was based on Colt Steele's YelpCamp during the Web Development Bootcamp.

### 🔒 License

Copyright Notice and Statement: currently not offering any license. Permission only to view and download.Declare







## 💥. Create server

app.js

```js
const express = require("express");

const app = express();
 
app.listen(3000, () => {
  console.log("listening on port http://127.0.0.1:3000");
});
```

## 💥. Ejs

views/home.ejs

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

app.js

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

> Create the schema for the campground model

models/campground.js

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

> connect mongoose 

app.js

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

app.js

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

![json](/Users/yuimorii/Documents/GitHub/The-Web-Developer-Bootcamp-2023/🌟Final Capstone/images/json.png)

> Check database

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

## Campgrounds index

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

> app.js

`Campground.find({})` method to retrieve data from ` models/campground.js `

```js
app.get("/campgrounds", async (req, res) => {
  const campgroundData = await Campground.find({});
  res.render("campgrounds/index", { campgroundData });
});
```

> /views/campgrounds/index.ejs

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Campgrounds</title>
  </head>
  <body>
    <h1>All Campgrounds</h1>
    <ul>
      <% for (let campground of campgroundData) { %>
      <li><%= campground.title %></li>
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
   <li><a href="/campgrounds/campground._id"><%= campground.title %></a></li>
   <% } %>
</ul>
```

