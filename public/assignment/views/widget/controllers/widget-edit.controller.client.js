(function () {
    angular
        .module("yungApp")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, widgetService) {
        var model = this;

        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;

        function init() {
            model.widget = widgetService.findWidgetById(model.widgetId);
        }
        init();



    }

})();