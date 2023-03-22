<div align="right">
  <img src="https://img.shields.io/badge/Completion-100%25-blue.svg" />
  <a href="https://github.com/Hsins/udemy_Yelp-Camp/blob/master/LICENSE" alt="License">
    <img src="https://img.shields.io/github/license/Hsins/udemy_Yelp-Camp.svg" />
  </a>
</div>

# 🏕 KYANPU_CAMP (キャンプ)

### 🔑 Introduction

KYANPU*CAMP is a website where users can discover campgrounds. This project was part of \_Colt Steele's web dev course on udemy.*

### 📰Certificate

> ![](https://udemy-certificate.s3.amazonaws.com/image/UC-f42e71ec-9da8-415d-8b8b-f238f17b1517.jpg?v=1672978934000)

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

Follow the instructions below to set up the environment and run this project on your local machine.

1. Clone this repository.

```bash
# Clone repository
$ git clone https://github.com/Hsins/udemy_Yelp-Camp.git
```

2. Install dependencies via NPM or Yarn

```bash
# Install dependencies via npm
$ npm install

# Install dependencies via yarn
$ yarn install
```

3. Run the server with [nodemon](https://nodemon.io/) and open a browser to visit [http://localhost:3000/](http://localhost:3000/).

```bash
# Run server
$ npm run dev
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

### ✨More Information

All the notes I took in [Markdown]format. You can find them in my [Udemy-Notes](https://github.com/Hsins/Udemy-Notes) repository. The note for this course is [here]().

### 🔒 License

Licensed under the MIT License, Copyright © 2023-present Itsyuimorii

### 
