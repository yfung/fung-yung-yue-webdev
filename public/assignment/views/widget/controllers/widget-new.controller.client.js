(function () {
    angular
        .module("yungApp")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($routeParams, widgetService) {
        var model = this;

        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;
        model.pageId = $routeParams.pageId;

        this.newHeaderWidget = newHeaderWidget;
        this.newImageWidget = newImageWidget;
        this.newYoutubeWidget = newYoutubeWidget;


        function init() {
        }
        init();

        function newHeaderWidget() {
            model.widget = widgetService.createWidget(model.pageId);
            model.widget.widgetType = "HEADING";
            widgetService.updateWidget(model.widget._id, model.widget)
        }

        function newImageWidget() {
            model.widget = widgetService.createWidget(model.pageId);
            model.widget.widgetType = "IMAGE";
            widgetService.updateWidget(model.widget._id, model.widget)
        }

        function newYoutubeWidget() {
            model.widget = widgetService.createWidget(model.pageId);
            model.widget.widgetType = "YOUTUBE";
            widgetService.updateWidget(model.widget._id, model.widget)
        }

    }

})();