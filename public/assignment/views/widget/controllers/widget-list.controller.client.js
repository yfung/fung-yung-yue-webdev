(function () {
    angular
        .module("yungApp")
        .controller("widgetListController", widgetListController);

    function widgetListController($routeParams, widgetService) {
        var model = this;

        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;
        model.pageId = $routeParams.pageId;

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
        }
        init();

    }

})();