# 🌟CAPSTONE 2: RESTful Comments App: INDEX

## GET vs POST

- used to retrieve information
- Data is sent via query string
- Information is plainly visible in the URL!
- Limited amount of data can be sent

- Used to post data to the server
- Used to write/create/update
- Data is sent via request body, not a query string!
- Can send any sort of data (JSON!)

## What is REST?

```bash
touch index.js
mkdir views
cd views
mkdir comments
cd comments
touch show.ejs

```

## RESTFUL Demo (fullCode)

## Routes: list all comments

// GET /comments - list all comments
// POST /comments - Create a new comment
// GET /comments/:id - Get one comment (using ID)
// PATCH /comments/:id - Update one comment
// DELETE /comments/:id - Destroy one comment

### ejs

```bash
npm i ejs
```

```js
// Views folder and EJS setup:
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
```

```js
app.get("/comments",(req,res)=>{
  res.render("comments/index");
})
```

### create a fake database

````js
// Our fake database:
let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]
````

> index.js

```js
const path = require("path");
const express = require("express");
const app = express();

//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }));
// To parse incoming JSON in POST request body:
app.use(express.json());
// Views folder and EJS setup:
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// **********************************
// INDEX - renders multiple comments
// **********************************
app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.listen(3000, () => {
  console.log("ON PORT 3000!");
});
```

### create a new file 

views/comments/index.ejs

```ejs
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Comments Index</title>
  </head>

  <body>
    <h1>Comments</h1>
    <ul>
      <!-- loop all the comments -->
      <% for(let c of comments) {%>
      <li>
        <%=c.comment%> - <b><%=c.username%></b>
        <a href="/comments/<%= c.id %>">details</a>
      </li>
      <% }%>
    </ul>
    <a href="/comments/new">New Comment</a>
  </body>
</html>

```

## Routes: Create New Comment



```javascript
// **********************************
// NEW - renders a form
// **********************************
app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

// **********************************
// CREATE - creates a new comment
// **********************************
app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  res.redirect("/comments");
});
```

 views/comments/new.ejs

```js
<body>
    <h1>Make a new comment</h1>
    <form action="/comments" method="post">
        <section>
            <label for="username">Enter username:</label>
            <input type="text" id="username" placeholder="username" name="username">
        </section>
        <section>
            <label for="comment">Comment Text</label>
            <br>
            <textarea id="comment" cols="30" rows="5" name="comment"></textarea>
        </section>
        <button>Submit</button>
    </form>
    <a href="/comments">Back to Index</a>
</body>
```



### Routes: Show Comments

```javascript
// *******************************************
// SHOW - details about one particular comment
// *******************************************
app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});
```



### Routes: Edit | Update | Delete comments

```javascript
// *******************************************
// EDIT - renders a form to edit a comment
// *******************************************
app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
});
// *******************************************
// UPDATE - updates a particular comment
// *******************************************
app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const foundComment = comments.find((c) => c.id === id);

  //get new text from req.body
  const newCommentText = req.body.comment;
  //update the comment with the data from req.body:
  foundComment.comment = newCommentText;
  //redirect back to index (or wherever you want)
  res.redirect("/comments");
});

// *******************************************
// DELETE/DESTROY- removes a single comment
// *******************************************
app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});
```

[The UUID package](https://www.npmjs.com/package/uuid)

[method-override](https://expressjs.com/en/resources/middleware/method-override.html)
