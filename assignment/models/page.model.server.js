var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
var websiteModel = require("./website.model.server");
var pageModel = mongoose.model("pageModel", pageSchema);
pageModel.createPage = createPage;
pageModel.findPagesByWebsiteId = findPagesByWebsiteId;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
module.exports = pageModel;

function createPage(page) {
    var pageTmp = null;
    return pageModel
        .create(page)
        .then(function (pageDoc) {
            pageTmp = pageDoc;
            return websiteModel.addPage(page.websiteId, pageDoc._id);
        })
        .then(function (userDoc) {
            return pageTmp;
        });
}

function findPagesByWebsiteId(websiteId) {
    return pageModel.find({websiteId: websiteId});
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function updatePage(pageId, page) {
    return pageModel.update({_id: pageId},
        {$set: page});
}

function deletePage(websiteId, pageId) {
    return pageModel
        .remove({_id: pageId})
        .then(function (status) {
            return websiteModel.deletePage(websiteId, pageId);
        });
}