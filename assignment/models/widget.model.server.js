var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var db = require("./database");
var widgetModel = mongoose.model("widgetModel", widgetSchema);

module.exports = widgetModel;

