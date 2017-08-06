var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
var db = require("./database");
var pageModel = mongoose.model("pageModel", pageSchema);
this.createPage = createPage;
this.findPagesForWebsite = findPagesForWebsite;
this.findPageById = findPageById;
this.updatePage = updatePage;
this.deletePage = deletePage;
module.exports = pageModel;

function createPage(page) {
    pageModel.create(page);
}

function findPagesForWebsite(websiteId) {
    return pageModel.find({websiteId: websiteId});
}

function findPageById(pageId) {
    return pageModel.find({_id: pageId});
}

function updatePage(pageId, page) {
    return pageModel.update({_id: pageId},
        {$set: page});
}

function deletePage(pageId) {
    return pageModel.remove({_id: pageId});
}