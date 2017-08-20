var app = require('./express');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var secret = "encrypt";
if (process.env.SECRET) {
    secret = process.env.SECRET;
}

app.use(cookieParser());
app.use(session({
    secret: secret,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

var express = app.express;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

// require("./test/app");
require("./assignment/app");

var port = process.env.PORT || 3000;

app.listen(port);