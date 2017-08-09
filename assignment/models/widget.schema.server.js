var mongoose = require("mongoose");
var widgetSchema = mongoose.Schema({
    name: String,
    pageId: {type: mongoose.Schema.Types.ObjectId, ref:"PageModel"},
    widgetType: {type: String, enum:['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
    size: Number,
    text: String,
    placeholder: String,
    height: String,
    rows: Number,
    url: String,
    width: String,
    class: String,
    icon: String,
    deletable: {type: Boolean, default: true},
    formatted: {type: Boolean, default: false},
    created: {type: Date, default: Date.now}
}, {collection: "widget"});
module.exports = widgetSchema;