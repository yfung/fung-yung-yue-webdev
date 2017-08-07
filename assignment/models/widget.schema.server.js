var mongoose = require("mongoose");


var widgetSchema = mongoose.Schema({
    name: String,
    pageId: String,
    widgetType: {type: String, enum:['HEADING, IMAGE, YOUTUBE, HTML, INPUT']},
    size: String,
    text: String,
    url: String,
    width: String
}, {collection: "widget"});
module.exports = widgetSchema;