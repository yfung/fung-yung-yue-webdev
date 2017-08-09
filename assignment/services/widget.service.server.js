var app = require("../../express");
var widgetModel = require("../models/widget.model.server");
var pageModel = require("../models/page.model.server");

var multer = require("../../public/vendor/multer/index");
var upload = multer({dest: './public/uploads'});

app.get("/api/user/:userId/website/:websiteId/page/:pageId/widget", findWidgetsByPageId);
app.post("/api/user/:userId/website/:websiteId/page/:pageId/widget", createWidget);
app.get("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", findWidgetById);
app.delete("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", deleteWidget);
app.put("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", updateWidget);
app.post("/api/upload", upload.single('myFile'), uploadImage);
app.put("/page/:pageId/widget", sortWidget);

function findWidgetsByPageId(request, response) {
    var pageId = request.params.pageId;

    pageModel
        .findPageById(pageId)
        .then(function (page) {
            response.json(page.widgets);
        });
}

function createWidget(request, response) {
    var pageId = request.params.pageId;
    var widget = request.body;
    widget.pageId = pageId;

    widgetModel
        .createWidget(widget)
        .then(function (widget) {
            response.send(widget);
        }, function (err) {
            response.sendStatus(500).send(err);
        });
}

function findWidgetById(request, response) {
    var widgetId = request.params.widgetId;

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            response.send(widget);
        });
}

function deleteWidget(request, response) {
    var widgetId = request.params.widgetId;
    var pageId = request.params.pageId;

    widgetModel
        .deleteWidget(pageId, widgetId)
        .then(function () {
            response.send("1");
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function updateWidget(request, response) {
    var widgetId = request.params.widgetId;
    var widget = request.body;

    widgetModel
        .updateWidget(widgetId, widget)
        .then(function (status) {
            response.send(status);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function uploadImage(req, res) {

    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    widget = widgetModel
        .findWidgetById(widgetId)
        .then(function () {
        });

    widget.url = '/uploads/' + filename;

    var callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;

    res.redirect(callbackUrl);
}

function sortWidget(request, response) {
    var initial = request.query.initial;
    var final = request.query.final;
    var widget = widgets[initial];

    widgets.splice(initial, 1);
    widgets.splice(final, 0, widget);

    response.json(widgets);
}