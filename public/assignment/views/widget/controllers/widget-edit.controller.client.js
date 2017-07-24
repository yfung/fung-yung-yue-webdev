(function () {
    angular
        .module("yungApp")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, widgetService) {
        var model = this;

        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;

        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;

        function init() {
            model.widget = widgetService.findWidgetById(model.widgetId);
        }
        init();

        function updateWidget() {
            widgetService.updateWidget(model.widgetId, model.widget);
        }

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId);
        }

    }

})();