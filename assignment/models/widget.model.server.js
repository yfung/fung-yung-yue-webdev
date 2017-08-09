var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var pageModel = require("./page.model.server");
var widgetModel = mongoose.model("WidgetModel", widgetSchema);
widgetModel.createWidget = createWidget;
widgetModel.findWidgetsByPageId = findWidgetsByPageId;
widgetModel.findWidgetById = findWidgetById;
widgetModel.deleteWidget = deleteWidget;
widgetModel.updateWidget = updateWidget;
module.exports = widgetModel;

function findWidgetsByPageId(pageId) {
    return widgetModel.find({pageId: pageId});
}

function createWidget(widget) {
    var widgetTmp = null;
    return widgetModel
        .create(widget)
        .then(function (widgetDoc) {
            widgetTmp = widgetDoc;
            return pageModel.addWidget(widget.pageId, widgetDoc._id);
        })
        .then(function (userDoc) {
            return widgetTmp;
        });

}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId},
        {$set: widget});
}

function deleteWidget(pageId, widgetId) {
    return widgetModel.remove({_id: widgetId})
        .then(function (status) {
            return pageModel.deleteWidget(pageId, widgetId);
        });
}