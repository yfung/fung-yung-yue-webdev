var mongoose = require("mongoose");

var types = ['HEADING, IMAGE, YOUTUBE, HTML, INPUT'];

var widgetSchema = mongoose.Schema({
    name: String,
    pageId: String,
    widgetType: {type: String, enum: types}
}, {collection: "widget"});
module.exports = widgetSchema;