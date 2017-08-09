var mongoose = require("mongoose");
var pageSchema = mongoose.Schema({
    name: String,
    websiteId: {type: mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"},
    description: String,
    widgets: [{type: mongoose.Schema.Types.ObjectId, ref:"WidgetModel"}],
    created: {type: Date, default: Date.now}
}, {collection: "page"});
module.exports = pageSchema;