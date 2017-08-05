var mongoose = require("mongoose");
var widgetSchema = mongoose.Schema({
    name: String,
    pageId: String,
    widgetType: String
}, {collection: "widget"});
module.exports = widgetSchema;