var mongoose = require("mongoose");

var types = ['HEADING, IMAGE, YOUTUBE, HTML, INPUT'];

var widgetSchema = mongoose.Schema({
    name: String,
    pageId: String,
    widgetType: String,
    size: String,
    text: String,
    url: String,
    width: String
}, {collection: "widget"});
module.exports = widgetSchema;