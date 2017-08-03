var app = require("../express");

var multer = require("../public/vendor/multer");
var upload = multer({ dest: './public/uploads' });

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

app.get("/api/user/:userId/website/:websiteId/page/:pageId/widget", findWidgetsByPageId);
app.post("/api/user/:userId/website/:websiteId/page/:pageId/widget", createWidget);
app.get("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", findWidgetById);
app.delete("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", deleteWidget);
app.put("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", updateWidget);
app.post("/api/upload", upload.single('myFile'), uploadImage);
app.put("/page/:pageId/widget", sortWidget);

function findWidgetsByPageId(request, response) {
    var pageWidgets = [];

    for (var w in widgets) {
        if (widgets[w].pageId === request.params.pageId) {
            pageWidgets.push(widgets[w]);
        }
    }
    response.json(pageWidgets);
}

function createWidget(request, response) {
    var pageId = request.params.pageId;
    var widget = request.body;

    widget.pageId = pageId;
    widget._id = (new Date()).getTime() + "";
    widgets.push(widget);
    response.json(widget);
}

function findWidgetById(request, response) {
    for (var w in widgets) {
        if (widgets[w]._id === request.params.widgetId) {
            response.send(widgets[w]);
            return;
        }
    }
}

function deleteWidget(request, response) {
    for (var w in widgets) {
        if (widgets[w]._id === request.params.widgetId) {
            widgets.splice(w, 1);
            response.send("1");
            return;
        }
    }
    response.sendStatus(404);
}

function updateWidget(request, response) {
    var widget = request.body;

    for (var w in widgets) {
        if (widgets[w]._id === request.params.widgetId) {
            widgets[w] = widget;
            response.json(widget);
        }
    }
    response.sendStatus(404);
}

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    for (var w in widgets) {
        if (widgets[w]._id === widgetId) {
            var widget = widgets[w];
        }
    }

    widget.url = '/uploads/' + filename;

    var callbackUrl   = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;

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