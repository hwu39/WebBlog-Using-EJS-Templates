//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const truncate = require("truncate");

const homeStartingContent = "This is a simple blog website that shares articles added by users. Part of each article is shown on the homepage, and each new article will be displayed on a seperate page using EJS templates. Click the COMPOSE to compose your first blog.";
const aboutContent = "The website is used to generate blogs written by users.";
const contactContent = "Anytime";

const app = express();

const msgArray = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render('home', {
    homeContent: homeStartingContent,
    messageArray: msgArray
  });
  // console.log(msgArray);
  //res.send();
});

app.get("/about", function(req, res) {
  res.render('about', {abtContent: aboutContent});
});

app.get("/contact", function(req, res) {
  res.render('contact', {ctContent: contactContent});
});

app.get("/compose", function(req, res) {
  let msg = "";
  res.render('compose');
  res.send();
});

app.post("/compose", function(req, res) {
  const msgObj = {
    postTitle: req.body.title,
    msg: req.body.postMessage,
    trun: truncate(req.body.postMessage, 100)
  };
  msgArray.push(msgObj);
  res.redirect("/");
  //console.log(msgObj);
});

app.get('/:page', function(req, res) {
  //res.send(req.page);
  msgArray.forEach(function(element) {
    if (_.lowerCase(req.params.page) === _.lowerCase(element.postTitle)) {
      console.log("Match Found!");
      //const trunMsg = truncate(element.msg, 100);
      res.render("post", {
        title: element.postTitle,
        message: element.msg
      });
    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
