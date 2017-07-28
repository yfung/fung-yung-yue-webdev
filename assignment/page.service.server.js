var app = require("../express");

var pages = [
    {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
    {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
    {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
];

app.get("/api/user/:userId/website/:websiteId/page", findPagesForWebsite);

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