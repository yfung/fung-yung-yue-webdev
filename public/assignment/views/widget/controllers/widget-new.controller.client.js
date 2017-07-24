(function () {
    angular
        .module("yungApp")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($routeParams, widgetService) {
        var model = this;

        model.widget = {};

        model.editNewHeader = editNewHeader;
        model.editNewImage = editNewImage;
        model.editNewYoutube = editNewYoutube;
        model.editNewHTML = editNewHTML;

        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;
        model.pageId = $routeParams.pageId;

        function init() {
        }
        init();

        function editNewHeader() {
            model.widget.widgetType = "HEADING";
            model.widget = widgetService.createWidget(model.pageId, model.widget);
        }

        function editNewImage() {
            model.widget.widgetType = "IMAGE";
            model.widget = widgetService.createWidget(model.pageId, model.widget);
        }

        function editNewYoutube() {
            model.widget.widgetType = "YOUTUBE";
            model.widget = widgetService.createWidget(model.pageId, model.widget);
        }

        function editNewHTML() {
            model.widget.widgetType = "HTML";
            model.widget = widgetService.createWidget(model.pageId, model.widget);
        }

    }

})();