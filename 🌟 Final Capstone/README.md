# 🏕 KYANPU_CAMP (キャンプ)📝 Learning Notes

# ⛳️AJAX and API

**應用程式介面（API, Application Programming Interface）** 是程式和程式之間的溝通接口，是一系列預先定義好的函數，目的在於使得不同的站點或應用程式之間可以互相存取資料或服務。

比如說：

- 呼叫 Twitter API 取得提及「Ice Cream」字句的推特。
- 呼叫 Facebook API 獲取特定用戶的大頭照。
- 呼叫 Weather API 取得指定地區的氣候狀況。
- 呼叫 Reddit API 獲取當前 Reddit 上討論最熱烈的文章標題。
- 呼叫 GooglePlaces API 取得當前用戶鄰近的餐廳資訊。

網路服務平台 [IFTTT](https://ifttt.com/) 就是串接了不同應用服務的 API 來構建一些自動化的命令集。不同的應用程式會提供不同的 API 接口，在 [ProgrammableWeb](https://www.programmableweb.com/) 中彙整了許多網站的 API 資訊。

## JSON and XML

透過 API 接口所取得的資料，通常採用 XML 或 JSON 表示：

XML

**可延伸標記式語言（XML, Extensible Markup Language）** 乍看之下與 HTML 十分類似，但標籤的作用並不在於描述頁面呈現的結果，而是一種 `key-value` 的關係：

```xml
<person>
  <age>21</age>
  <name>Travis</name>
  <city>Los Angeles</city>
</person>
```

JSON

**JavaScript 物件標記格式（JSON, JavaScript Object Notation）** 則是將資料的格式以 JavaScript 物件來表達，由於近幾年的網頁在呼叫 API 時往往透過 JavaScript，當回傳的資料型態以 JSON 表示時，可以十分迅速地作為物件資料來處理，所以漸漸成為近幾年的主流：

```json
{
  "person": {
    "age": "21",
    "name": "Travis",
    "city": "Los Angeles"
  }
}
```

# Making API Requests with Node

## Send Request with Command Line

對伺服器發送請求並不是只有透過瀏覽器或是 Postman 這類的工具才可以達成，在命令行中我們可以使用 [curl](https://curl.haxx.se/) 發送請求：

```bash
$ curl www.google.com
```

## Send Request with Node.js

我們在 Node.js 中可以引入 [request](https://github.com/request/request) 套件來對伺服器發送請求，首先透過 npm 進行安裝：

```bash
# Install request with npm
npm install request
```

在代碼中使用 request 發送請求：

```javascript
const request = require('request');
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
```

## Sunset Time API Example

在這一小節我們呼叫 [Yahoo Weather API](https://developer.yahoo.com/weather/) 來獲取夏威夷的日落時間：

```javascript
const request = require('request');

request('https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    let parseData = JSON.parse(body);
    console.log("Sunset At Hawaii is at ...");
    console.log(parseData["query"]["results"]["channel"]["astronomy"]["sunset"]);
  }
});
```

在上述代碼中我們要注意到的是雖然透過 API 請求所得到的 JSON 檔案以 JavaScript 的物件格式呈現，但他本身並不是一個 JavaScript 物件，而是一個字串。所以此處透過 `JSON.parse()` 方法來將他轉換成物件。

## JSON Placeholder API Example

由於 [Yahoo Weather API](https://developer.yahoo.com/weather/) 將在 2019 年淘汰，在這一小節中將介紹 [JSONPlaceholder](https://jsonplaceholder.typicode.com/) 來進行測試：

```javascript
const rp = require('request-promise');

rp('https://jsonplaceholder.typicode.com/users/1')
  .then((body) => {
    const parsedData = JSON.parse(body);
    console.log(`${parsedData.name} lives in ${parsedData.address.city}`);
  })
  .catch((err) => {
    console.log('Error!', err);
  });
```

## Note about Movie API lectures

在接下來課程中所使用到的 Open Movie Data Base Movie API 已經不提供公用的接口，不過 Colt 申請了 API 密鑰提供大家使用。使用 API 密鑰發送請求的方式為：

- **General search**: `http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb`
- **Search with Movie ID**: `http://www.omdbapi.com/?i=tt3896198&apikey=thewdb`

操作方式和影片中幾乎一樣，只需要在發送請求時把密鑰放置在末端即可。

## Movie API App: Introduction

在接下來的小節中，我們要透過呼叫 API 來創建一個查找電影資料的應用程式，由於亞馬遜公司下的網路電影資料庫（IMDb, Internet Movie Database）並沒有提供 API 服務，在接下來的課程中我們使用 [OMDB](http://www.omdbapi.com/) 所提供的 API；除此之外，還可以考慮 [TMDB](https://www.themoviedb.org/)。

首先創建我們的專案資料夾與初始環境：

```bash
# Create Project Folder
mkdir movie_search_app
cd movie_search_app

# npm install
npm init
npm install --save express ejs request

# Create app.js File
touch app.js
```

## Movie API App: Results Route

在這一小節中，我們簡單先處理路由與基礎呼叫 API 的部分，以下代碼的結果將建立一個 `/results` 路由，在該頁面下顯示在 OMDB 資料庫中搜尋「guardians of the galaxy」所找到的第一部電影名稱。

```javascript
var express = require("express");
var request = require("request");
var app = express();

app.get("/results", function(req, res) {
    request('http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        res.send(data["Search"][0]["Title"]);
  }
});
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie App has started!");
});
```

## Movie API App: Displaying Data

這一小節將要實作的是將呼叫 API 所得到的資料，傳遞到模板頁中，並透過模板渲染實際頁面。所以在 `app.js` 中將代碼改寫如下：

```javascript
var express = require("express");
var request = require("request");
var app = express();
app.set("view engine", "ejs");

app.get("/results", function(req, res) {
    request('http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        res.render("results", {data: data});
  }
});
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie App has started!");
});
```

接著創建 `views` 資料夾與模板頁面 `results.ejs`，並修改模板頁面內容如下：

```ejs
<h1>Results Pages!!</h1>

<% data["Search"].forEach(function(movie) { %>
   <li><%= movie["Title"] %></li> 
<% }) %>
```

## Movie API App: Adding Search

接著在這一小節我們要建立搜尋頁面，實際上就是透過一個 HTML 中的表單來獲取使用者輸入，並將值傳遞給 `/result` 路由進行渲染。首先我們在 `app.js` 中添加根目錄的路由，並修改 `/result` 路由，注意的是此處由表單所提交的資料，可以透過 `req.query.search` 取得：

```javascript
var express = require("express");
var request = require("request");
var app = express();
app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("search");
});

app.get("/results", function(req, res) {
    var query = req.query.search;
    var url = "http://omdbapi.com/?s=" + query + "&apikey=thewdb";
    
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        res.render("results", {data: data});
  }
});
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie App has started!");
});
```

接著修改根目錄的 `search.ejs` 模板：

```ejs
<h1>Search For a Movie</h1>

<form action="/results" method="GET">
    <input type="text" placeholder="search term" name="search">
    <input type="submit">
</form>
```

以及 `results.ejs` 模板：

```ejs
<h1>Results Page!!!</h1>

<ul>
    <% data["Search"].forEach(function(movie) { %>
      <li>
          <strong>
              <%= movie["Title"] %>
          </strong> 
          - <%=movie["Year"]%>
      </li>
    <% }) %>
</ul>

<a href="/">Search Again!</a>
```

# Server Side Frameworks

## 1. Creating Server with Express

### #Express Method

> NPM package which comes with a bunch of methods and optional plugiins that we can use to build web applications and API`s

## 2. Introduction to Express

### [#]()Library

When you use a library, you are in charge! You control the flow of the application code, and you decide when to use the library. 

### [#]()Framework

With frameworks, that control is inverted.  The framework is in charge, and you are merely a participant! The framework tells you where to plug in the code.

This class is taught using Express.js, a lightweight, Node.js-based open source framework for building web applications. Lightweight does not mean that it implements less functionality, but rather that many of the details that are hidden behind the framework are not obscured compared to heavyweight frameworks like Rails, which allows for a better understanding of the backend.

## 3. Our First Express App

```bash
$ mkdir FirstExpressApp
$ cd FirstExpressApp
$ touch app.js
$ npm install express --save
```

> app.use method is that any time we have an incoming request, this callback

```javascript
// This download does not include the node_modules folder
// REMEMBER TO RUN "npm install" first, to tell NPM to download the needed packages
const express = require("express");
const app = express();

//app.use method is that any time we have an incoming request, this callback
app.use((req, res) => {
    console.log("WE GOT A NEW REQUEST!!")
    res.send('<h1>This is my webpage!</h1>')
  	console.dir(req);
})


app.listen(3000, () => {
    console.log("LISTENING ON PORT 8080")
})
```

> ‼️ Express creates this JavaScript object automatically for us by parsing the incoming HTTP request information, and then it passes it in as the first argument to this callback.
>
> Express通过解析传入的HTTP请求信息，为我们自动创建了这个JavaScript对象，然后将其作为第一个参数传递给这个回调。

The above code will create a server that listens to a specified **port** and responds to requests in a **route**. Routing refers to determining how the application responds to a client's request for a specific endpoint, which contains `URI` and a specific HTTP request method (e.g. `GET`, `POST`...etc.). For more information about this section, please refer to the following document.

- [Express | Hello World](http://expressjs.com/en/starter/hello-world.html)
- [Express | Basic routing](http://expressjs.com/en/starter/basic-routing.html)

It is worth mentioning that on the local side, the server listening section should be written as follows:

```javascript
//=============================
// Server
//=============================

// Tell Express to Listen for requests (start server)
app.listen(3000, () => {
    console.log("LISTENING ON PORT 8080")
})
```

- So an HTTP request is not a JavaScript object, it's **text information.**
  - It is not particular to any programming language, but express turns it into it takes that data, it **parses** **it** and it **turns it into a object that it passes in,** in this case to our **callback** for use.

> app.get 

```javascript
app.get('/', (req, res) => {
    res.send('Welcome to the home page!')
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.send(`<h1>Browsing the ${subreddit} subreddit</h1>`)
})

app.get('/r/:subreddit/:postId', (req, res) => {
    const { subreddit, postId } = req.params;
    res.send(`<h1>Viewing Post ID: ${postId} on the ${subreddit} subreddit</h1>`)
})

app.post('/cats', (req, res) => {
    res.send('POST REQUEST TO /cats!!!! THIS IS DIFFERENT THAN A GET REQUEST!')
})

app.get('/cats', (req, res) => {
    res.send('MEOW!!')
})

app.get('/dogs', (req, res) => {
    res.send('WOOF!')
})
app.get('/search', (req, res) => {
    const { q } = req.query;
    if (!q) {
        res.send('NOTHING FOUND IF NOTHING SEARCHED!')
    } else {
        res.send(`<h1>Search results for: ${q}</h1>`)
    }
})

app.get('*', (req, res) => {
    res.send(`I don't know that path!`)
})


// /cats => 'meow'
// /dogs => 'woof'
// '/' 
```

## 4. The Package.json

> `package.json` 是一個符合 [CommonJS 規定](http://wiki.commonjs.org/wiki/Packages/1.1) 用來描述套件包的文件，使用 `json` 格式表示，在其中可以定義 **相依（dependency）** 的相關套件以及應用程式資訊，以便我們管理專案所會使用到的套件及其對應版本。透過以下命令可以初始化 `package.json` 檔案：

```bash
$ npm init
```

在安裝套件時，在後方加上 `--save` 參數可以將其加到專案的相依套件中，也就是在 `package.json` 中加上對應的內容，比如：

```bash
$ npm install express --save
```

Related supplements can be viewed at.

- [What is the file `package.json`?](https://docs.nodejitsu.com/articles/getting-started/npm/what-is-the-file-package-json/)
- [Node.js 系列學習日誌 #6 - 使用 package.json 安裝、管理模組](https://ithelp.ithome.com.tw/articles/10158140)

## How to automate server restart

在前面的單元我們知道可以使用 `node app.js` 命令來啟動伺服器，在助教提供的 [YouTube | Automate Node Server Restart with Nodemon](https://www.youtube.com/watch?v=GvLvrlOqq9g) 影片中介紹了 [nodemon](https://nodemon.io/) 工具來自動地重新載入更動的檔案並啟動伺服器。

```bash
# Install nodemon with npm
$ npm install -g nodemon

# Run server with nodemon
$ nodemon
```

## Route Params

### The  Route Matcher

承接上一個課程的路由概念，當使用者對那些沒有設置路由的位置發送 `GET` 請求時，伺服器端將回應 `Cannot GET /URL`，我們可以透過 `*` 對這些位置進行通配，回應相同的結果：

```javascript
app.get("*", function(req, res) {
  res.send("There is no ROUTE!");
});
```

### Route Order

值得注意的是，路由撰寫時擺放的位置是會影響伺服器處理的順序的，比方說將 `*` 通配擺放在其他路由之前，那麼伺服器在處理時都會先受到 `*` 通配路由影響，其餘的都不會處理了。

### Route Pamras

除此之外，我們經常需要將某種模式所匹配到所有路由都對應到同一個組件，比如針對不同的 ID 的用戶來說，路徑可能是 `./user/<id>`，在這裡可以透過 **路由參數（route parameter）** 來標記，比如：

```javascript
app.get("/post/:topic/comments/:id/:title/", function(req, res) {
  console.log(req.params);
  res.send("There is a Route Pamras Page!");
});
```

傳入時的路由參數將被保存在 `req.parems` 當中。

# ⛳️Intermediate Express

## Creating Dynamic HTML with EJS

>  What is the "E" for? "Embedded?" Could be. How about "Effective," "Elegant," or just "Easy"? EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. No religiousness about how to organize things. No reinvention of iteration and control-flow. It's just plain JavaScript. [ejs-Efficient JavaScript Template Engine](https://ejs.co/)

```javascript
app.get("/fellinlovewith/:thing", function(req, res){
  var thing = req.params.thing;
  res.render("love.ejs", {thingVar: thing});
});
```

```javascript
<h1>You fell in love with: <%= thingVar.toUpperCase() %></h1>
<p>P.S. this is the love.js</p>
```

## Install EJS

It's easy to install EJS with NPM.

```bash
$ npm install ejs
```

##  Configure the app to use EJS

除此之外，我們可以透過以下方式設定預設的渲染引擎，也就是往後在路由中渲染頁面時不用加上後綴的副檔名：

```javascript
// Default express variable
const express = require("express");
const app = express();

const path = require("path");

// Setting the static PATH
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
```

设置这条语句`app.set("view engine", "ejs");`之后

```javascript
// Before Setting "view engine"
app.get("/", function(req, res){
  res.render("home.ejs");
});

// After Setting "view engine"
app.get("/", function(req, res){
  res.render("home");
});
```

## EJS Syntax

- `<%` 'Scriptlet' tag, for control-flow, no output

- `<%_` ‘Whitespace Slurping’ Scriptlet tag, strips all whitespace before it

- `<%=` Outputs the value into the template (HTML escaped)

  > `<%= %> `这里面的代码会被作为javascript处理
  >
  > `<%= ‘hello world.toUpperCase() %>`

- `<%-` Outputs the unescaped value into the template

- `<%#` Comment tag, no execution, no output

- `<%%` Outputs a literal '<%'

- `%>` Plain ending tag

- `-%>` Trim-mode ('newline slurp') tag, trims following newline

- `_%>` ‘Whitespace Slurping’ ending tag, removes all whitespace after it

#### 1. Condition&Loops in EJS

在使用條件判斷式時，採用 `<% %>` 進行標註：

```ejs
<% if(thingVar.toLowerCase() === "rusty") { %>
  <p>GOOD CHOICE! RUSTY IS THE BEST!</p>
<% } else { %>
  <p>Bad Choice! You should have say Rusty!</p>
<% } %>
```

在使用迴圈時，採用 `<% %>` 進行標註：

```ejs
<% for (var i = 0; i < posts.length; i++){ %>
  <li>
    <%= posts[i].title %> - <strong><%= posts[i].author %></strong>
  </li>
<% } %>
<% posts.forEach(function(post) { %>
  <li>
    <%= post.title %> - <strong><%= post.author %></strong>
  </li>
<% }) %>
```

#### 2. Pass parameters from route directly into the ejs file

> index.js 			=> routes

```javascript
app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('random', { num })
})
```

> Random.ejs

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Random</title>
</head>

<body>
    <h1>Your random number is: <%= num %></h1>
    <% if(num % 2 === 0){ %>
    <h2>That is an even number!</h2>
    <% } else { %>
    <h2>That is an odd number!</h2>
    <% } %>
    <p>Here's an alternate way of doing it:</p>
    <h3>That number is: <%= num%2===0 ? 'EVEN' : 'ODD' %></h3>
</body>

</html>
     
```

#### 3. EJS with JSON

> Data.json 

```javascript
const redditData = require('./data.json');
```

> index.js

```javascript
app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', { ...data });
    } else {
        res.render('notfound', { subreddit })
    }
})
```

> Subreddit.ejs

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= name %> </title>
    <link rel="stylesheet" href="/app.css">
</head>

<body>
    <h1>Browsing The <%= name %> subreddit</h1>
    <h2><%= description %></h2>
    <p><%=subscribers %> Total Subscribers</p>
    <hr>
<!--using for loop to get data from data.JSON -->
    <% for(let post of posts) { %>
    <article>
        <p><%= post.title %> - <b><%=post.author %></b></p>
        <% if(post.img) { %>
        <img src="<%= post.img %>" alt="">
        <% } %>
    </article>
    <% } %>
</body>
</html>
```

#### Showcase(Full Code):

```javascript
const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/cats', (req, res) => {
    const cats = [
        'Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'
    ]
    res.render('cats', { cats })
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', { ...data });
    } else {
        res.render('notfound', { subreddit })
    }
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('random', { num })
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
}
```

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Not Found </title>
</head>

<body>
    <h1>I'm sorry, we couldn't find the <%= subreddit %> subreddit!</h1>

</body>

</html>
```

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= name %> </title>
    <link rel="stylesheet" href="/app.css">
</head>

<body>
    <h1>Browsing The <%= name %> subreddit</h1>
    <h2><%= description %></h2>
    <p><%=subscribers %> Total Subscribers</p>
    <hr>

    <% for(let post of posts) { %>
    <article>
        <p><%= post.title %> - <b><%=post.author %></b></p>
        <% if(post.img) { %>
        <img src="<%= post.img %>" alt="">
        <% } %>
    </article>
    <% } %>
</body>

</html>
```

## Serving Static Assets In Express

> notify EJS, Tell Express that we want to use a directory named public for any the image or CSS files, any scripts and the directory will be located in the root directory of our application.

```javascript
// Setting the static PATH
app.use(express.static("public"));
```

## Serving Custom Assets

倘若我們要替頁面加上 CSS 或 JavaScript 效果，當然可以在每一個 ejs 檔案中添加 `<style>` 標籤，但這無疑是個不便利且笨拙的方法。較佳的方式是透過如下的方式引入資源：

```html
<link ref="stylesheet" href="/style.css">
```

而我們通常是將這類資源存放在 `public` 文件夾下，然而必須透過以下的方式告知 node.js 在伺服器執行時，存取檔案的預設路徑：

```javascript
// Default express variable
var express = require("express");
var app = express();

// Setting the static PATH
app.use(express.static("public"));
```

# ⛳️ Defining RESTful Routes

##  What is REST/RESTful?

**表現層狀態轉換（REST, Representational State Transfer）** 是一種網路架構的風格，具有此種風格的系統可以稱為是 RESTful 的，或者更直白地說：**「將 URL 定位資源，以 HTTP 協議所定義的 `GET`、`POST`、`DELETE` 等請求來描述操作」**。在這樣的基礎之下，可以直觀地從 URL 名稱、發送的請求以及請求所得到的狀態碼就知道做了什麼操作？結果如何？

## URL Design

RESTful 的核心思想就是讓用戶端發送的請求操作都具備有「動詞 + 受詞」的結構，其中「動詞」的部分透過常用的 HTTP 方法來實踐，對應 CRUD 操作：

- `GET`：讀取（Read）
- `POST`：創建（Create）
- `PUT`：更新（Update）
- `PATCH`：更新（Update），通常是部分更新
- `DELETE`：刪除（Delete）

而「受詞」的部分就是 API 的 URL，這部份透過設置路由來完成。

關於 RESTful 的解釋與說明，很建議查看這篇問題下的回答 [知乎 | 怎样用通俗的语言解释REST，以及RESTful？](https://www.zhihu.com/question/28557115) 和 [阮一峰的网络日志 | RESTful API 最佳实践](http://www.ruanyifeng.com/blog/2018/10/restful-api-best-practices.html)。

## A Table of all 7 RESTful routes

承上所述，所謂的 REST 就是將 HTTP 路由與 CRUD 操作進行對應，

| Name    | Path             | HTTP Verb. | Purpose                                           |
| :------ | :--------------- | :--------: | :------------------------------------------------ |
| INDEX   | `/dogs/`         |   `GET`    | List all dogs.                                    |
| NEW     | `/dogs/new`      |   `GET`    | Show new dog form.                                |
| CREATE  | `/dogs/`         |   `POST`   | Create a new dog, then redirect somewhere.        |
| SHOW    | `/dogs/:id`      |   `GET`    | Show info about one specific dog.                 |
| EDIT    | `/dogs/:id/edit` |   `GET`    | Shoe edit form for one dog.                       |
| UPDATE  | `/dogs/:id`      |   `PUT`    | Update a particular dog, then redirect somewhere. |
| DESTORY | `/dogs/:id`      |  `DELETE`  | Delete a particular dog, then redirect somewhere. |





# ⛳️Basic CRUD

## 💥. Create basic server

app.js

```js
//import express
const express = require("express");
//create app instance
const app = express();
//start server
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

## 💥. Create Campground model

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

## 💥. Create a new campground testing in one of routes

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

![json](https://res.cloudinary.com/dxmfrq4tk/image/upload/v1678767226/webdevbootcamp2023/json_n7nkc4.png)

> Check database

```bash
mongosh
use Kyanpu-camp
db.campgrounds.find()
```

![db.find](https://res.cloudinary.com/dxmfrq4tk/image/upload/v1678767228/webdevbootcamp2023/db.find_qqxqh3.png)

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

## 💥All campgrounds listing page

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

`Campground.find({})` method to retrieve data from `models/campground.js`

```js
app.get("/campgrounds", async (req, res) => {
  const campgroundData = await Campground.find({});
  res.render("campgrounds/index", { campgroundData });
});
```

### 2. For loop list all new campground site from db

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

index.ejs 中有所有 campground list, 在 campground.title 外層增加 a 標籤即可實現此效果,

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

![show](https://res.cloudinary.com/dxmfrq4tk/image/upload/v1678767229/webdevbootcamp2023/show_kprbmu.png)

## 💥 Create new campground

### 1. Create new route

```js
app.get("/campgrounds/new", async (req, res) => {
  res.render("campgrounds/new");
});
```

📝note: this route must be exist before campgrounds/:id, as it is new. this route must be exist before campgrounds/:id, as if it is after :id route, it will treat new as an id

### 2. Create `new.ejs`, it is a form for user to input new campground info

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

notes📝: `name="campground[title]"` -> 這種寫法是為了更好的分類 ![campground[title]](https://res.cloudinary.com/dxmfrq4tk/image/upload/v1678767227/webdevbootcamp2023/campground_title_cbkfkh.png)

![new camp](https://res.cloudinary.com/dxmfrq4tk/image/upload/v1678767228/webdevbootcamp2023/newcampform_gcbko3.png)

### 3. Set the endpoint to set a POST request for the "form submission destination" when the "Add Camp" button is clicked.

### 1. test body.parse

> app.js

```js
//parse the body when using "req.body"
app.use(express.urlencoded({ extended: true }));

app.post("./campgrounds", async (req, res) => {
  res.send(req.body);
});
```

![newcamp](https://res.cloudinary.com/dxmfrq4tk/image/upload/v1678767229/webdevbootcamp2023/newcampinfo_bnhx5s.png)

![parsebody](https://res.cloudinary.com/dxmfrq4tk/image/upload/v1678767229/webdevbootcamp2023/parsebody_rmkwam.png)

### 2. After getting the data from the client side, create this new camp

```js
app.post("/campgrounds", async (req, res) => {
  //res.send(req.body);

  //take request of body campground instead of our route and submit that or create a new campground
  const campground = new Campground(req.body.campground);
  await campground.save(); //save data into database

  res.redirect(`/campgrounds/${campground._id}`);
});
```

![new camp](https://res.cloudinary.com/dxmfrq4tk/image/upload/v1678767228/webdevbootcamp2023/new_camp_egfjic.png)

### 4. add `<a href="">` to page

> views/campgrounds/index.ejs

```js
<div>
  <a href="/campgrounds/new">Add new campground</a>
</div>
```

> views/campgrounds/show.ejs

```js
<footer>
  <a href="/campgrounds">All campgrounds List</a>
</footer>
```

> views/campgrounds/new.ejs

```js
<div>
  <a href="/campgrounds">All campgrounds list</a>
</div>
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
<p>
  <a href="/campgrounds/<%=campgroundId._id%>/edit">Edit</a>
</p>
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

![edit](https://res.cloudinary.com/dxmfrq4tk/image/upload/v1678767228/webdevbootcamp2023/edit_xoabt1.png)

![succeesful](https://res.cloudinary.com/dxmfrq4tk/image/upload/v1678767230/webdevbootcamp2023/succeesful_z6z1yi.png)

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

![campground[title]](https://res.cloudinary.com/dxmfrq4tk/image/upload/v1678767229/webdevbootcamp2023/update_djzp6t.png)

![update info](https://res.cloudinary.com/dxmfrq4tk/image/upload/v1678767230/webdevbootcamp2023/update_info_te4ged.png)

## 💥 Delete camp

app.js

```js
//page for delete
app.delete("/campgrounds/:id/", async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect("/campgrounds");
});
```

show.ejs

```js
<p>
  <form
    action="/campgrounds/<%=campgroundId._id%>?_method=DELETE"
    method="POST"
  >
    <button>Delete</button>
  </form>
</p>
```

# ⛳️ Handling Errors in Express Apps

# ⛳️Errors Handling & Validating Data

# ⛳️Data Relationships with Mongo

REQUEST ----->

- middleware are just function
- each middlware has **access** to the `request` and `response` object
- middleware can **end the HTTP request** by sending back a **_response_** with methods like `res.send()`
- OR middleware can be **chained together**, one after antoher by calling `next()`

RESPONSE ----->

### install [morgan](https://github.com/expressjs/morgan)

```js
const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("tiny"));

app.use((req, res, next) => {
  req.requestTime = Date.now();
  console.log(req.method, req.path);
  next();
});

app.use("/dogs", (req, res, next) => {
  console.log("I LOVE DOGS!!");
  next();
});

const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "chickennugget") {
    next();
  }
  res.send("YOU NEED A PASSWORD!");
};

// app.use((req, res, next) => {
//     console.log("THIS IS MY FIRST MIDDLEWARE!!!")
//     return next();
//     console.log("THIS IS MY FIRST MIDDLEWARE - AFTER CALLING NEXT()")
// })
// app.use((req, res, next) => {
//     console.log("THIS IS MY SECOND MIDDLEWARE!!!")
//     return next();
// })
// app.use((req, res, next) => {
//     console.log("THIS IS MY THIRD MIDDLEWARE!!!")
//     return next();
// })

app.get("/", (req, res) => {
  console.log(`REQUEST DATE: ${req.requestTime}`);
  res.send("HOME PAGE!");
});

app.get("/dogs", (req, res) => {
  console.log(`REQUEST DATE: ${req.requestTime}`);
  res.send("WOOF WOOF!");
});

app.get("/secret", verifyPassword, (req, res) => {
  res.send(
    "MY SECRET IS: Sometimes I wear headphones in public so I dont have to talk to anyone"
  );
});

app.use((req, res) => {
  res.status(404).send("NOT FOUND!");
});

app.listen(3000, () => {
  console.log("App is running on localhost:3000");
});
```



# 

# ⛳️Mongo Relationships with Express



# ⛳️ Campground Review  

## Defining the review models

Connect multiple reviews to one campground, so it is `one to many` relationship, And what we're going to do is just embed **an array of object IDs** in each campground. And the reason for that is that *we could theoretically have thousands and thousands of reviews for someof the more popular places, just like Yelp does.* 

> models/review.js

```js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  body: String,
  rating: Number,
});


module.exports = mongoose.model("Review", reviewSchema);
```

> models/review.js

```js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

module.exports = mongoose.model("Campground", CampgroundSchema);

```

## Add the review form

> views/campgrounds/show.ejs

```js
  <h3>📝Leave a Review</h3>
    <form action=" " class="mb-3">
      <div class="mb-3">
        <label class="form-label" for="body">Rating:</label>
        <input
          class="form-range"
          type="range"
          min="1"
          max="5"
          name="review[rating]"
          id="rating"
        />
      </div>
      <div class="mb-3">
        <label class="form-label" for="body">Review:</label>
        <textarea
          class="form-control"
          name="review[body]"
          id="body"
          cols="30"
          rows="3"
        ></textarea>
      </div>
      <button class="btn btn-success">Submit</button>
    </form>
  </div>
```

## Creating Reviews

### 💥Where the Review submit to ? 

POST /reviews
