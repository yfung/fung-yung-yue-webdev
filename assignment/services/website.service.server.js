var app = require("../../express");
var websiteModel = require("../models/website.model.server");

app.get("/api/user/:userId/website", findWebsitesForUser);
app.post("/api/user/:userId/website", createWebsite);
app.get("/api/user/:userId/website/:websiteId", findWebsiteById);
app.put("/api/user/:userId/website/:websiteId", updateWebsite);
app.delete("/api/user/:userId/website/:websiteId", deleteWebsite);

function findWebsitesForUser(request, response) {
    var userId = request.params.userId;

    websiteModel
        .findWebsitesForUser(userId)
        .then(function (websites) {
            response.send(websites);
        });
}

function createWebsite(request, response) {
    var userId = request.params.userId;
    var website = request.body;
    website.developerId = userId;

    websiteModel
        .createWebsite(website)
        .then(function (website) {
            response.json(website);
        }, function (err) {
            response.sendStatus(500).send(err);
        });
}

function findWebsiteById(request, response) {
    var websiteId = request.params.websiteId;

    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
                response.json(website);
            },
            function (err) {
                response.sendStatus(404).send(err);
            });
}

function updateWebsite(request, response) {
    var websiteId = request.params.websiteId;
    var website = request.body;

    websiteModel
        .updateWebsite(websiteId, website)
        .then(function (status) {
            response.json(status);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function deleteWebsite(request, response) {
    var websiteId = request.params.websiteId;
    var userId = request.params.userId;

    websiteModel
        .deleteWebsite(userId, websiteId)
        .then(function (status) {
            response.json(status);
        });
}