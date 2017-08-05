var mongoose = require("mongoose");
var websiteSchema = mongoose.Schema({
    name: String,
    developerId: String,
    description: String
}, {collection: "website"});
module.exports = websiteSchema;