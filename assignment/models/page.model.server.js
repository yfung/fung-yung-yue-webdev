var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
var websiteModel = require("./website.model.server");
var pageModel = mongoose.model("pageModel", pageSchema);
pageModel.createPage = createPage;
pageModel.findPagesForWebsite = findPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
module.exports = pageModel;

function createPage(page) {
    var pageTmp = null;
    pageModel
        .create(page)
        .then(function (pageDoc) {
            pageTmp = pageDoc;
            return websiteModel.addPage(page.websiteId, pageDoc._id);
        })
        .then(function (userDoc) {
            return pageTmp;
        });
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