var app = require('./express');
var express = app.express;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
// require("./utilities/filelist");

app.use(express.static(__dirname + '/public'));

require("./test/app");

var port = process.env.PORT || 3000;

app.listen(port);