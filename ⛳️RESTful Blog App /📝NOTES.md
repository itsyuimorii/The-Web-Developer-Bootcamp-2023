# 🌟CAPSTONE 1: RESTful Blog App: INDEX

### Create Project

```bash
# Create Project Folder
$ mkdir BlogApp

# npm init and install packages
$ cd BlogApp
$ npm init
$ npm install express mongoose body-parser --save
$ npm install ejs --save
```

### Initiate Views File

創建頁面：

```bash
$ mkdir views
$ touch views/index.ejs
```

### Initiate `app.js`

```javascript
// Import dependencies
const bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  express = require("express"),
  app = express();

// Application Config
mongoose.connect("mongodb://localhost:27017/blog_app", {
  useNewUrlParser: true,
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Database Schema Config
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", blogSchema);

// // Add content to DATABASE
// Blog.create({
//   title: "Test Blog",
//   image: "https://images.unsplash.com/photo-1554365228-f051bbfbcab0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
//   body: "HELLO, THIS IS A BLOG POST!"
// });

// Index Routes
app.get("/", function (req, res) {
  res.redirect("/blogs");
});

app.get("/blogs", function (req, res) {
  Blog.find({}, function (err, blogs) {
    if (err) {
      console.log("Error");
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});

app.listen(process.env.PORT, process.env.IP, function () {
  console.log("SERVER IS RUNNING!");
});
```

## Blog App: Layout

### Create Folders and Files

```bash
$ mkdir views/partials
$ touch views/partials/header.ejs
$ touch views/partials/footer.ejs
```

### `header.ejs`

```ejs
<html>
  <head>
    <title>Blog App</title>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css">
    <link rel="stylesheet" type="text/css" href="/stylesheets/app.css">
  </head>
  <body>
    <div class="ui fixed inverted menu">
      <div class="ui container">
        <div class="header item"><i class="code icon"></i>Blog Site</div>
        <a href="/" class="item">Home</a>
        <a href="/blogs/new" class="item">New Post</a>
      </div>
    </div>
```

### `index.ejs`

```ejs
<% include ./partials/header %>

<div class="ui main text container">
  <div class="ui huge header">RESTful Blog App</div>
  <div class="ui top attached segment">
    <div class="ui divided items">
      <% blogs.forEach(function(blog){ %>
        <div class="item">
          <div class="image">
           <img src="<%= blog.image %>">
          </div>
          <div class="content">
            <a class="header" href="/blogs/<%= blog._id %>"><%= blog.title %></a>
            <div class="meta">
              <span><%= blog.created.toDateString() %></span>
            </div>
            <div class="description">
              <p><%- blog.body.substring(0, 100) %>...</p>
            </div>
            <div class="extra">
              <a class="ui floated basic violet button" href="/blogs/<%= blog._id %>">
                Read More<i class="right chevron icon"></i>
              </a>
            </div>
          </div>
        </div>
      <% }) %>
    </div>
  </div>
</div>

<% include ./partials/footer %>
```

### `app.css`

```css
i.icon {
  font-size: 2em;
}

.container.main {
  margin-top: 7em;
}

#delete {
  display: inline;
}
```

## Note about RESTful Blog App: New and Create

在下一個課程中，講師將會介紹一種新的方式來透過 `<form>` 表單提交資料到伺服器端，在以往我們會使用 `name` 屬性：

```html
<input type="text" name="title" />
```

新的使用方法會是：

```html
<input type="text" name="blog[title]" />
```

前一種方法要取值時使用 `req.body.title`，而後者則為 `req.body.blog.title`。

## RESTful Blog App: NEW and CREATE

### Add Routers

```javascript
// NEW ROUTE
app.get("/blogs/new", function (req, res) {
  res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function (req, res) {
  Blog.create(req.body.blog, function (err, newBlog) {
    if (err) {
      res.render("new");
    } else {
      res.redirect("/blogs");
    }
  });
});
```

### `new.ejs`

```ejs
<% include ./partials/header %>

<div class="ui main text container segment">
  <div class="ui huge header">New Blog</div>
  <form class="ui form" action="/blogs" method="POST">
    <div class="field">
      <label>Title</label>
      <input type="text" name="blog[title]" placeholder="Title">
    </div>
    <div class="field">
      <label>Image</label>
      <input type="text" name="blog[image]" placeholder="Image">
    </div>
    <div class="field">
      <label>Blog Content</label>
      <textarea name="blog[body]"></textarea>
    </div>
    <input class="ui violet big basic button" type="submit">
  </form>
</div>

<% include ./partials/footer %>
```

## Note about RESTful Blog App: SHOW

在下一個課程中，講師將會介紹使用字串的 `substring()` 方法來將文字進行略縮，如果採用此種方法可能會返回 `Cannot read property 'substring' of undefined` 錯誤，這將使一筆不含 body 的資料存入資料庫中，只需要將此筆資料進行刪除即可。

除此之外，關於文件層級：

- `/` 表示根目錄
- `./` 表示當前目錄
- `../` 表示上一層目錄

## RESTful Blog App: SHOW

### Add Router

```javascript
// SHOW ROUTE
app.get("/blogs/:id", function (req, res) {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("show", { blog: foundBlog });
    }
  });
});
```

### `show.ejs`

```ejs
<% include ./partials/header %>

<div class="ui main text container segment">
  <div class="ui huge header"><%= blog.title %></div>
  <div class="ui top attached">
    <div class="item">
      <img class="ui centered rounded image" src="<%= blog.image %>">
      <div class="content">
        <span><%= blog.created.toDateString() %></span>
      </div>
      <div class="description">
        <p><%- blog.body %></p>
      </div>
      <a class="ui orange basic button" href="/blogs/<%= blog._id %>/edit">Edit</a>
      <form id="delete" action="/blogs/<%= blog._id %>?_method=DELETE" method="POST">
        <button class="ui red basic button">Delete</button>
      </form>
    </div>
  </div>
</div>

<% include ./partials/footer %>
```

## RESTful Blog App: EDIT AND UPDATE

### Add Routers

```javascript

```

### Method Override

在 HTML 中並沒有提供 `PUT` 方法和 `DELETE` 方法，詳細內容可以參考 [StackExchange | Why are there are no PUT and DELETE methods on HTML forms?](https://softwareengineering.stackexchange.com/questions/114156/why-are-there-are-no-put-and-delete-methods-on-html-forms) 這篇回答的內容。因此我們必須使用 `method-override` 來替我們將 `GET` 或 `POST` 請求改成其他 HTTP 動詞，在此之前必須安裝 `method-override` 套件：

```bash
$ npm install method-override --save
```

然後就可以在表單中加入 `_method` 的隱藏輸入控件（也可以使用其他名稱）來承載實際需要的 HTTP 動詞，透過伺服器端對這個控件的動詞進行改寫。

### `edit.ejs`

```ejs
<% include ./partials/header %>

<div class="ui main text container segment">
  <div class="ui huge header">Edit <%= blog.title %></div>
  <form class="ui form" action="/blogs/<%= blog._id %>?_method=PUT" method="POST">
    <div class="field">
      <label>Title</label>
      <input type="text" name="blog[title]" value= "<%= blog.title %>">
    </div>
    <div class="field">
      <label>Image</label>
      <input type="text" name="blog[image]" value= "<%= blog.image %>">
    </div>
    <div class="field">
      <label>Blog Content</label>
      <textarea name="blog[body]"><%= blog.body %></textarea>
    </div>
    <input class="ui violet big basic button" type="submit">
  </form>
</div>

<% include ./partials/footer %>
```

## RESTful Blog App: DESTROY

```javascript
// DESTROY ROUTE
app.delete("/blogs/:id", function (req, res) {
  Blog.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs");
    }
  });
});
```

## Note about RESTful Blog App: Final Touches

## [Lecture] RESTful Blog App: Final Touches

### Sanitizer

為了確保安全性及避免 XSS 注入攻擊，使用 `express-sanitizer` 套件來去除含有惡意 JavaScript 代碼的內容：

```bash
# Install express-sanitizer with npm
$ npm install express-sanitizer --save
```

### Final `app.js`

```javascript
// Import dependencies
const bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  expressSanitizer = require("express-sanitizer"),
  mongoose = require("mongoose"),
  express = require("express"),
  app = express();

// Application Config
mongoose.connect("mongodb://localhost:27017/blog_app", {
  useNewUrlParser: true,
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

// Database Schema Config
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", blogSchema);

// // Add content to DATABASE
// Blog.create({
//   title: "Test Blog",
//   image: "https://images.unsplash.com/photo-1554365228-f051bbfbcab0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
//   body: "HELLO, THIS IS A BLOG POST!"
// });

// INDEX ROUTER
app.get("/", function (req, res) {
  res.redirect("/blogs");
});

app.get("/blogs", function (req, res) {
  Blog.find({}, function (err, blogs) {
    if (err) {
      console.log("Error");
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});

// NEW ROUTE
app.get("/blogs/new", function (req, res) {
  res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function (req, res) {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.create(req.body.blog, function (err, newBlog) {
    if (err) {
      res.render("new");
    } else {
      res.redirect("/blogs");
    }
  });
});

// SHOW ROUTE
app.get("/blogs/:id", function (req, res) {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("show", { blog: foundBlog });
    }
  });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function (req, res) {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("edit", { blog: foundBlog });
    }
  });
});

// UPDATE ROUTE
app.put("/blogs/:id", function (req, res) {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(
    req.params.id,
    req.body.blog,
    function (err, updatedBlog) {
      if (err) {
        res.redirect("/blogs");
      } else {
        res.redirect("/blogs/" + req.params.id);
      }
    }
  );
});

// DESTROY ROUTE
app.delete("/blogs/:id", function (req, res) {
  Blog.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs");
    }
  });
});

app.listen(process.env.PORT, process.env.IP, function () {
  console.log("SERVER IS RUNNING!");
});
```
