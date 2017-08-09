var app = require("../../express");
var pageModel = require("../models/page.model.server");

app.get("/api/user/:userId/website/:websiteId/page", findPagesForWebsite);
app.post("/api/user/:userId/website/:websiteId/page", createPage);
app.get("/api/user/:userId/website/:websiteId/page/:pageId", findPageById);
app.delete("/api/user/:userId/website/:websiteId/page/:pageId", deletePage);
app.put("/api/user/:userId/website/:websiteId/page/:pageId", updatePage);

function findPagesForWebsite(request, response) {
    var websiteId = request.params.websiteId;

    pageModel
        .findPagesByWebsiteId(websiteId)
        .then(function (pages) {
            response.send(pages);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function createPage(request, response) {
    var websiteId = request.params.websiteId;
    var page = request.body;

    page.websiteId = websiteId;

    pageModel
        .createPage(page)
        .then(function (page) {
            response.json(page);
        }, function (err) {
            response.sendStatus(500).send(err);
        });
}

function findPageById(request, response) {
    var pageId = request.params.pageId;

    pageModel
        .findPageById(pageId)
        .then(function (page) {
            response.send(page);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function deletePage(request, response) {
    var pageId = request.params.pageId;
    var websiteId = request.params.websiteId;

    pageModel
        .deletePage(websiteId, pageId)
        .then(function () {
            response.send("1");
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function updatePage(request, response) {
    var pageId = request.params.pageId;
    var page = request.body;

    pageModel
        .updatePage(pageId, page)
        .then(function (status) {
            response.json(status);
        });
}