var mongoose = require("mongoose");
var pageSchema = mongoose.Schema({
    name: String,
    websiteId: String,
    description: String
}, {collection: "page"});
module.exports = pageSchema;