var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
var db = require("./database");
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);
this.createWebsite = createWebsite;
this.findWebsitesForUser = findWebsitesForUser;
this.findWebsiteById = findWebsiteById;
this.deleteWebsite = deleteWebsite;
this.updateWebsite = updateWebsite;
module.exports = websiteModel;

function createWebsite(website) {
    return websiteModel.create(website);
}

function findWebsitesForUser(userId) {
    return websiteModel.find({developerId: userId});
}

function findWebsiteById(websiteId) {
    return websiteModel.find({_id: websiteId});
}

function updateWebsite(websiteId, website) {
    return websiteModel.update({_id: websiteId},
        {$set: website});
}

function deleteWebsite(websiteId) {
    return websiteModel.remove({_id: websiteId});
}