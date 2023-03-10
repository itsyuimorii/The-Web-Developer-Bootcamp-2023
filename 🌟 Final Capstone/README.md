# ð KYANPU_CAMP (ã­ã£ã³ã)ð Learning Notes

# â³ï¸AJAX and API

**æç¨ç¨å¼ä»é¢ï¼API, Application Programming Interfaceï¼** æ¯ç¨å¼åç¨å¼ä¹éçæºéæ¥å£ï¼æ¯ä¸ç³»åé åå®ç¾©å¥½çå½æ¸ï¼ç®çå¨æ¼ä½¿å¾ä¸åçç«é»ææç¨ç¨å¼ä¹éå¯ä»¥äºç¸å­åè³æææåã

æ¯å¦èªªï¼

- å¼å« Twitter API åå¾æåãIce Creamãå­å¥çæ¨ç¹ã
- å¼å« Facebook API ç²åç¹å®ç¨æ¶çå¤§é ­ç§ã
- å¼å« Weather API åå¾æå®å°åçæ°£åçæ³ã
- å¼å« Reddit API ç²åç¶å Reddit ä¸è¨è«æç±ççæç« æ¨é¡ã
- å¼å« GooglePlaces API åå¾ç¶åç¨æ¶é°è¿çé¤å»³è³è¨ã

ç¶²è·¯æåå¹³å° [IFTTT](https://ifttt.com/) å°±æ¯ä¸²æ¥äºä¸åæç¨æåç API ä¾æ§å»ºä¸äºèªååçå½ä»¤éãä¸åçæç¨ç¨å¼ææä¾ä¸åç API æ¥å£ï¼å¨ [ProgrammableWeb](https://www.programmableweb.com/) ä¸­å½æ´äºè¨±å¤ç¶²ç«ç API è³è¨ã

## JSON and XML

éé API æ¥å£æåå¾çè³æï¼éå¸¸æ¡ç¨ XML æ JSON è¡¨ç¤ºï¼

XML

**å¯å»¶ä¼¸æ¨è¨å¼èªè¨ï¼XML, Extensible Markup Languageï¼** ä¹çä¹ä¸è HTML ååé¡ä¼¼ï¼ä½æ¨ç±¤çä½ç¨ä¸¦ä¸å¨æ¼æè¿°é é¢åç¾ççµæï¼èæ¯ä¸ç¨® `key-value` çéä¿ï¼

```xml
<person>
  <age>21</age>
  <name>Travis</name>
  <city>Los Angeles</city>
</person>
```

JSON

**JavaScript ç©ä»¶æ¨è¨æ ¼å¼ï¼JSON, JavaScript Object Notationï¼** åæ¯å°è³æçæ ¼å¼ä»¥ JavaScript ç©ä»¶ä¾è¡¨éï¼ç±æ¼è¿å¹¾å¹´çç¶²é å¨å¼å« API æå¾å¾éé JavaScriptï¼ç¶åå³çè³æåæä»¥ JSON è¡¨ç¤ºæï¼å¯ä»¥ååè¿éå°ä½çºç©ä»¶è³æä¾èçï¼æä»¥æ¼¸æ¼¸æçºè¿å¹¾å¹´çä¸»æµï¼

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

å°ä¼ºæå¨ç¼éè«æ±ä¸¦ä¸æ¯åªæééçè¦½å¨ææ¯ Postman éé¡çå·¥å·æå¯ä»¥éæï¼å¨å½ä»¤è¡ä¸­æåå¯ä»¥ä½¿ç¨ [curl](https://curl.haxx.se/) ç¼éè«æ±ï¼

```bash
$ curl www.google.com
```

## Send Request with Node.js

æåå¨ Node.js ä¸­å¯ä»¥å¼å¥ [request](https://github.com/request/request) å¥ä»¶ä¾å°ä¼ºæå¨ç¼éè«æ±ï¼é¦åéé npm é²è¡å®è£ï¼

```bash
# Install request with npm
npm install request
```

å¨ä»£ç¢¼ä¸­ä½¿ç¨ request ç¼éè«æ±ï¼

```javascript
const request = require('request');
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
```

## Sunset Time API Example

å¨éä¸å°ç¯æåå¼å« [Yahoo Weather API](https://developer.yahoo.com/weather/) ä¾ç²åå¤å¨å¤·çæ¥è½æéï¼

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

å¨ä¸è¿°ä»£ç¢¼ä¸­æåè¦æ³¨æå°çæ¯éç¶éé API è«æ±æå¾å°ç JSON æªæ¡ä»¥ JavaScript çç©ä»¶æ ¼å¼åç¾ï¼ä½ä»æ¬èº«ä¸¦ä¸æ¯ä¸å JavaScript ç©ä»¶ï¼èæ¯ä¸åå­ä¸²ãæä»¥æ­¤èéé `JSON.parse()` æ¹æ³ä¾å°ä»è½ææç©ä»¶ã

## JSON Placeholder API Example

ç±æ¼ [Yahoo Weather API](https://developer.yahoo.com/weather/) å°å¨ 2019 å¹´æ·æ±°ï¼å¨éä¸å°ç¯ä¸­å°ä»ç´¹ [JSONPlaceholder](https://jsonplaceholder.typicode.com/) ä¾é²è¡æ¸¬è©¦ï¼

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

å¨æ¥ä¸ä¾èª²ç¨ä¸­æä½¿ç¨å°ç Open Movie Data Base Movie API å·²ç¶ä¸æä¾å¬ç¨çæ¥å£ï¼ä¸é Colt ç³è«äº API å¯é°æä¾å¤§å®¶ä½¿ç¨ãä½¿ç¨ API å¯é°ç¼éè«æ±çæ¹å¼çºï¼

- **General search**: `http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb`
- **Search with Movie ID**: `http://www.omdbapi.com/?i=tt3896198&apikey=thewdb`

æä½æ¹å¼åå½±çä¸­å¹¾ä¹ä¸æ¨£ï¼åªéè¦å¨ç¼éè«æ±ææå¯é°æ¾ç½®å¨æ«ç«¯å³å¯ã

## Movie API App: Introduction

å¨æ¥ä¸ä¾çå°ç¯ä¸­ï¼æåè¦ééå¼å« API ä¾åµå»ºä¸åæ¥æ¾é»å½±è³æçæç¨ç¨å¼ï¼ç±æ¼äºé¦¬éå¬å¸ä¸çç¶²è·¯é»å½±è³æåº«ï¼IMDb, Internet Movie Databaseï¼ä¸¦æ²ææä¾ API æåï¼å¨æ¥ä¸ä¾çèª²ç¨ä¸­æåä½¿ç¨ [OMDB](http://www.omdbapi.com/) ææä¾ç APIï¼é¤æ­¤ä¹å¤ï¼éå¯ä»¥èæ® [TMDB](https://www.themoviedb.org/)ã

é¦ååµå»ºæåçå°æ¡è³æå¤¾èåå§ç°å¢ï¼

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

å¨éä¸å°ç¯ä¸­ï¼æåç°¡å®åèçè·¯ç±èåºç¤å¼å« API çé¨åï¼ä»¥ä¸ä»£ç¢¼ççµæå°å»ºç«ä¸å `/results` è·¯ç±ï¼å¨è©²é é¢ä¸é¡¯ç¤ºå¨ OMDB è³æåº«ä¸­æå°ãguardians of the galaxyãææ¾å°çç¬¬ä¸é¨é»å½±åç¨±ã

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

éä¸å°ç¯å°è¦å¯¦ä½çæ¯å°å¼å« API æå¾å°çè³æï¼å³éå°æ¨¡æ¿é ä¸­ï¼ä¸¦ééæ¨¡æ¿æ¸²æå¯¦éé é¢ãæä»¥å¨ `app.js` ä¸­å°ä»£ç¢¼æ¹å¯«å¦ä¸ï¼

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

æ¥èåµå»º `views` è³æå¤¾èæ¨¡æ¿é é¢ `results.ejs`ï¼ä¸¦ä¿®æ¹æ¨¡æ¿é é¢å§å®¹å¦ä¸ï¼

```ejs
<h1>Results Pages!!</h1>

<% data["Search"].forEach(function(movie) { %>
   <li><%= movie["Title"] %></li> 
<% }) %>
```

## Movie API App: Adding Search

æ¥èå¨éä¸å°ç¯æåè¦å»ºç«æå°é é¢ï¼å¯¦éä¸å°±æ¯ééä¸å HTML ä¸­çè¡¨å®ä¾ç²åä½¿ç¨èè¼¸å¥ï¼ä¸¦å°å¼å³éçµ¦ `/result` è·¯ç±é²è¡æ¸²æãé¦åæåå¨ `app.js` ä¸­æ·»å æ ¹ç®éçè·¯ç±ï¼ä¸¦ä¿®æ¹ `/result` è·¯ç±ï¼æ³¨æçæ¯æ­¤èç±è¡¨å®ææäº¤çè³æï¼å¯ä»¥éé `req.query.search` åå¾ï¼

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

æ¥èä¿®æ¹æ ¹ç®éç `search.ejs` æ¨¡æ¿ï¼

```ejs
<h1>Search For a Movie</h1>

<form action="/results" method="GET">
    <input type="text" placeholder="search term" name="search">
    <input type="submit">
</form>
```

ä»¥å `results.ejs` æ¨¡æ¿ï¼

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

> â¼ï¸ Express creates this JavaScript object automatically for us by parsing the incoming HTTP request information, and then it passes it in as the first argument to this callback.
>
> Expresséè¿è§£æä¼ å¥çHTTPè¯·æ±ä¿¡æ¯ï¼ä¸ºæä»¬èªå¨åå»ºäºè¿ä¸ªJavaScriptå¯¹è±¡ï¼ç¶åå°å¶ä½ä¸ºç¬¬ä¸ä¸ªåæ°ä¼ éç»è¿ä¸ªåè°ã

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

> `package.json` æ¯ä¸åç¬¦å [CommonJS è¦å®](http://wiki.commonjs.org/wiki/Packages/1.1) ç¨ä¾æè¿°å¥ä»¶åçæä»¶ï¼ä½¿ç¨ `json` æ ¼å¼è¡¨ç¤ºï¼å¨å¶ä¸­å¯ä»¥å®ç¾© **ç¸ä¾ï¼dependencyï¼** çç¸éå¥ä»¶ä»¥åæç¨ç¨å¼è³è¨ï¼ä»¥ä¾¿æåç®¡çå°æ¡ææä½¿ç¨å°çå¥ä»¶åå¶å°æçæ¬ãééä»¥ä¸å½ä»¤å¯ä»¥åå§å `package.json` æªæ¡ï¼

```bash
$ npm init
```

å¨å®è£å¥ä»¶æï¼å¨å¾æ¹å ä¸ `--save` åæ¸å¯ä»¥å°å¶å å°å°æ¡çç¸ä¾å¥ä»¶ä¸­ï¼ä¹å°±æ¯å¨ `package.json` ä¸­å ä¸å°æçå§å®¹ï¼æ¯å¦ï¼

```bash
$ npm install express --save
```

Related supplements can be viewed at.

- [What is the file `package.json`?](https://docs.nodejitsu.com/articles/getting-started/npm/what-is-the-file-package-json/)
- [Node.js ç³»åå­¸ç¿æ¥èª #6 - ä½¿ç¨ package.json å®è£ãç®¡çæ¨¡çµ](https://ithelp.ithome.com.tw/articles/10158140)

## How to automate server restart

å¨åé¢çå®åæåç¥éå¯ä»¥ä½¿ç¨ `node app.js` å½ä»¤ä¾ååä¼ºæå¨ï¼å¨å©ææä¾ç [YouTube | Automate Node Server Restart with Nodemon](https://www.youtube.com/watch?v=GvLvrlOqq9g) å½±çä¸­ä»ç´¹äº [nodemon](https://nodemon.io/) å·¥å·ä¾èªåå°éæ°è¼å¥æ´åçæªæ¡ä¸¦ååä¼ºæå¨ã

```bash
# Install nodemon with npm
$ npm install -g nodemon

# Run server with nodemon
$ nodemon
```

## Route Params

### The  Route Matcher

æ¿æ¥ä¸ä¸åèª²ç¨çè·¯ç±æ¦å¿µï¼ç¶ä½¿ç¨èå°é£äºæ²æè¨­ç½®è·¯ç±çä½ç½®ç¼é `GET` è«æ±æï¼ä¼ºæå¨ç«¯å°åæ `Cannot GET /URL`ï¼æåå¯ä»¥éé `*` å°éäºä½ç½®é²è¡ééï¼åæç¸åççµæï¼

```javascript
app.get("*", function(req, res) {
  res.send("There is no ROUTE!");
});
```

### Route Order

å¼å¾æ³¨æçæ¯ï¼è·¯ç±æ°å¯«ææºæ¾çä½ç½®æ¯æå½±é¿ä¼ºæå¨èççé åºçï¼æ¯æ¹èªªå° `*` ééæºæ¾å¨å¶ä»è·¯ç±ä¹åï¼é£éº¼ä¼ºæå¨å¨èçæé½æååå° `*` ééè·¯ç±å½±é¿ï¼å¶é¤çé½ä¸æèçäºã

### Route Pamras

é¤æ­¤ä¹å¤ï¼æåç¶å¸¸éè¦å°æç¨®æ¨¡å¼æå¹éå°ææè·¯ç±é½å°æå°åä¸åçµä»¶ï¼æ¯å¦éå°ä¸åç ID çç¨æ¶ä¾èªªï¼è·¯å¾å¯è½æ¯ `./user/<id>`ï¼å¨éè£¡å¯ä»¥éé **è·¯ç±åæ¸ï¼route parameterï¼** ä¾æ¨è¨ï¼æ¯å¦ï¼

```javascript
app.get("/post/:topic/comments/:id/:title/", function(req, res) {
  console.log(req.params);
  res.send("There is a Route Pamras Page!");
});
```

å³å¥æçè·¯ç±åæ¸å°è¢«ä¿å­å¨ `req.parems` ç¶ä¸­ã

# â³ï¸Intermediate Express

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

é¤æ­¤ä¹å¤ï¼æåå¯ä»¥ééä»¥ä¸æ¹å¼è¨­å®é è¨­çæ¸²æå¼æï¼ä¹å°±æ¯å¾å¾å¨è·¯ç±ä¸­æ¸²æé é¢æä¸ç¨å ä¸å¾ç¶´çå¯æªåï¼

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

è®¾ç½®è¿æ¡è¯­å¥`app.set("view engine", "ejs");`ä¹å

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

- `<%_` âWhitespace Slurpingâ Scriptlet tag, strips all whitespace before it

- `<%=` Outputs the value into the template (HTML escaped)

  > `<%= %> `è¿éé¢çä»£ç ä¼è¢«ä½ä¸ºjavascriptå¤ç
  >
  > `<%= âhello world.toUpperCase() %>`

- `<%-` Outputs the unescaped value into the template

- `<%#` Comment tag, no execution, no output

- `<%%` Outputs a literal '<%'

- `%>` Plain ending tag

- `-%>` Trim-mode ('newline slurp') tag, trims following newline

- `_%>` âWhitespace Slurpingâ ending tag, removes all whitespace after it

#### 1. Condition&Loops in EJS

å¨ä½¿ç¨æ¢ä»¶å¤æ·å¼æï¼æ¡ç¨ `<% %>` é²è¡æ¨è¨»ï¼

```ejs
<% if(thingVar.toLowerCase() === "rusty") { %>
  <p>GOOD CHOICE! RUSTY IS THE BEST!</p>
<% } else { %>
  <p>Bad Choice! You should have say Rusty!</p>
<% } %>
```

å¨ä½¿ç¨è¿´åæï¼æ¡ç¨ `<% %>` é²è¡æ¨è¨»ï¼

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

åè¥æåè¦æ¿é é¢å ä¸ CSS æ JavaScript ææï¼ç¶ç¶å¯ä»¥å¨æ¯ä¸å ejs æªæ¡ä¸­æ·»å  `<style>` æ¨ç±¤ï¼ä½éç¡çæ¯åä¸ä¾¿å©ä¸ç¬¨æçæ¹æ³ãè¼ä½³çæ¹å¼æ¯ééå¦ä¸çæ¹å¼å¼å¥è³æºï¼

```html
<link ref="stylesheet" href="/style.css">
```

èæåéå¸¸æ¯å°éé¡è³æºå­æ¾å¨ `public` æä»¶å¤¾ä¸ï¼ç¶èå¿é ééä»¥ä¸çæ¹å¼åç¥ node.js å¨ä¼ºæå¨å·è¡æï¼å­åæªæ¡çé è¨­è·¯å¾ï¼

```javascript
// Default express variable
var express = require("express");
var app = express();

// Setting the static PATH
app.use(express.static("public"));
```

# â³ï¸ Defining RESTful Routes

##  What is REST/RESTful?

**è¡¨ç¾å±¤çæè½æï¼REST, Representational State Transferï¼** æ¯ä¸ç¨®ç¶²è·¯æ¶æ§çé¢¨æ ¼ï¼å·ææ­¤ç¨®é¢¨æ ¼çç³»çµ±å¯ä»¥ç¨±çºæ¯ RESTful çï¼æèæ´ç´ç½å°èªªï¼**ãå° URL å®ä½è³æºï¼ä»¥ HTTP åè­°æå®ç¾©ç `GET`ã`POST`ã`DELETE` ç­è«æ±ä¾æè¿°æä½ã**ãå¨éæ¨£çåºç¤ä¹ä¸ï¼å¯ä»¥ç´è§å°å¾ URL åç¨±ãç¼éçè«æ±ä»¥åè«æ±æå¾å°ççæç¢¼å°±ç¥éåäºä»éº¼æä½ï¼çµæå¦ä½ï¼

## URL Design

RESTful çæ ¸å¿ææ³å°±æ¯è®ç¨æ¶ç«¯ç¼éçè«æ±æä½é½å·åæãåè© + åè©ãççµæ§ï¼å¶ä¸­ãåè©ãçé¨åééå¸¸ç¨ç HTTP æ¹æ³ä¾å¯¦è¸ï¼å°æ CRUD æä½ï¼

- `GET`ï¼è®åï¼Readï¼
- `POST`ï¼åµå»ºï¼Createï¼
- `PUT`ï¼æ´æ°ï¼Updateï¼
- `PATCH`ï¼æ´æ°ï¼Updateï¼ï¼éå¸¸æ¯é¨åæ´æ°
- `DELETE`ï¼åªé¤ï¼Deleteï¼

èãåè©ãçé¨åå°±æ¯ API ç URLï¼éé¨ä»½ééè¨­ç½®è·¯ç±ä¾å®æã

éæ¼ RESTful çè§£éèèªªæï¼å¾å»ºè­°æ¥çéç¯åé¡ä¸çåç­ [ç¥ä¹ | ææ ·ç¨éä¿çè¯­è¨è§£éRESTï¼ä»¥åRESTfulï¼](https://www.zhihu.com/question/28557115) å [é®ä¸å³°çç½ç»æ¥å¿ | RESTful API æä½³å®è·µ](http://www.ruanyifeng.com/blog/2018/10/restful-api-best-practices.html)ã

## A Table of all 7 RESTful routes

æ¿ä¸æè¿°ï¼æè¬ç REST å°±æ¯å° HTTP è·¯ç±è CRUD æä½é²è¡å°æï¼

| Name    | Path             | HTTP Verb. | Purpose                                           |
| :------ | :--------------- | :--------: | :------------------------------------------------ |
| INDEX   | `/dogs/`         |   `GET`    | List all dogs.                                    |
| NEW     | `/dogs/new`      |   `GET`    | Show new dog form.                                |
| CREATE  | `/dogs/`         |   `POST`   | Create a new dog, then redirect somewhere.        |
| SHOW    | `/dogs/:id`      |   `GET`    | Show info about one specific dog.                 |
| EDIT    | `/dogs/:id/edit` |   `GET`    | Shoe edit form for one dog.                       |
| UPDATE  | `/dogs/:id`      |   `PUT`    | Update a particular dog, then redirect somewhere. |
| DESTORY | `/dogs/:id`      |  `DELETE`  | Delete a particular dog, then redirect somewhere. |





# â³ï¸Basic CRUD

## ð¥. Create basic server

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

## ð¥. Ejs

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

## ð¥. Create Campground model

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

## ð¥. Create a new campground testing in one of routes

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

## ð¥. setup some fake campgrounds seed data

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

## ð¥All campgrounds listing page

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

## ð¥ Show router

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

index.ejs ä¸­æææ campground list, å¨ campground.title å¤å±¤å¢å  a æ¨ç±¤å³å¯å¯¦ç¾æ­¤ææ,

```js
<ul>
   <% for (let campground of campgroundData) { %>
   <li><a href="/campgrounds/<%= campground._id %>"><%= campground.title %></a></li>
   <% } %>
</ul>
```

![list all camp](/Users/yuimorii/Documents/GitHub/The-Web-Developer-Bootcamp-2023/ðFinal Capstone/images/list all camp.png)

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

## ð¥ Create new campground

### 1. Create new route

```js
app.get("/campgrounds/new", async (req, res) => {
  res.render("campgrounds/new");
});
```

ðnote: this route must be exist before campgrounds/:id, as it is new. this route must be exist before campgrounds/:id, as if it is after :id route, it will treat new as an id

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

notesð: `name="campground[title]"` -> éç¨®å¯«æ³æ¯çºäºæ´å¥½çåé¡ ![campground[title]](https://res.cloudinary.com/dxmfrq4tk/image/upload/v1678767227/webdevbootcamp2023/campground_title_cbkfkh.png)

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

## ð¥Edit campground info

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

## ð¥ Delete camp

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

# â³ï¸ Handling Errors in Express Apps

# â³ï¸Errors Handling & Validating Data

# â³ï¸Data Relationships with Mongo

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

# â³ï¸Mongo Relationships with Express



# â³ï¸ Campground Review  

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
  <h3>ðLeave a Review</h3>
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

### ð¥Where the Review submit to ? 

POST /reviews
