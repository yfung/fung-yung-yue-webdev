(function () {
    angular
        .module("yungApp")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, widgetService, $location) {
        var model = this;

        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;

        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;

        function init() {
            widgetService
                .findWidgetById(model.widgetId, model.userId, model.websiteId, model.pageId)
                .then(function (response) {
                    model.widget = response.data;
                });
        }

        init();

        function updateWidget(widget) {
            widgetService
                .updateWidget(model.widgetId, model.userId, model.websiteId, model.pageId, widget)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
                });
        }

        function deleteWidget() {
            widgetService
                .deleteWidget(model.widgetId, model.userId, model.websiteId, model.pageId)
                .then(function (response) {
                    if (response.data === "1") {
                        $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
                    }
                });
        }

    }

})();