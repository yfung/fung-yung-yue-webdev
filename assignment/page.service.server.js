var app = require("../express");

var pages = [
    {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
    {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
    {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
];

app.get("/api/user/:userId/website/:websiteId/page", findPagesForWebsite);
app.post("/api/user/:userId/website/:websiteId/page", createPage);
app.get("/api/user/:userId/website/:websiteId/page/:pageId", findPageById);
app.delete("/api/user/:userId/website/:websiteId/page/:pageId", deletePage);
app.put("/api/user/:userId/website/:websiteId/page/:pageId", updatePage);

function findPagesForWebsite(request, response) {
    var websiteId = request.params.websiteId;
    var webPages = [];

    for (var p in pages) {
        if (pages[p].websiteId === websiteId) {
            webPages.push(pages[p]);
        }
    }
    response.json(webPages);
}

function createPage(request, response) {
    var websiteId = request.params.websiteId;
    var page = request.body;

    page.websiteId = websiteId;
    page._id = (new Date()).getTime() + "";
    pages.push(page);
    response.json(page);
}

function findPageById(request, response) {
    for (var p in pages) {
        if (pages[p]._id === request.params.pageId) {
            response.send(pages[p]);
            return;
        }
    }
}

function deletePage(request, response) {
    var pageId = request.params.pageId;

    for (var p in pages) {
        if (pages[p]._id === pageId) {
            pages.splice(p, 1);
            response.send("1");
            return;
        }
    }
    response.sendStatus(404);
}

function updatePage(request, response) {
    var pageId = request.params.pageId;
    var page = request.body;

    for (var p in pages) {
        if (pages[p]._id === pageId) {
            pages[p] = page;
            response.send(page);
            return;
        }
    }
    response.sendStatus(404);
}