var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var widgetModel = mongoose.model("widgetModel", widgetSchema);
this.findWidgetsByPageId = findWidgetsByPageId;
this.createWidget = createWidget;
this.findWidgetById = findWidgetById;
this.deleteWidget = deleteWidget;
this.updateWidget = updateWidget;

module.exports = widgetModel;

function findWidgetsByPageId(pageId) {
    return widgetModel.find({pageId: pageId});
}

function createWidget(widget) {
    return widgetModel.create(widget);
}

function findWidgetById(widgetId) {
    return widgetModel.find({_id: widgetId});
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId},
        {$set: widget});
}

function deleteWidget(widgetId) {
    return widgetModel.remove({_id: widgetId});
}