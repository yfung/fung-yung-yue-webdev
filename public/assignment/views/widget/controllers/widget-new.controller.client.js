(function () {
    angular
        .module("yungApp")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($routeParams, widgetService, $location) {
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

        function editNewHeader(widget) {
            widget.widgetType = "HEADING";
            widgetService.createWidget(model.pageId, model.userId, model.websiteId, widget)
                .then(function (response) {
                    model.widget = response.data;
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + model.widget._id);
                });
        }

        function editNewImage(widget) {
            widget.widgetType = "IMAGE";
            widgetService.createWidget(model.pageId, model.userId, model.websiteId, widget)
                .then(function (response) {
                    model.widget = response.data;
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + model.widget._id);
                });
        }

        function editNewYoutube(widget) {
            widget.widgetType = "YOUTUBE";
            widgetService.createWidget(model.pageId, model.userId, model.websiteId, widget)
                .then(function (response) {
                    model.widget = response.data;
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + model.widget._id);
                });
        }

        function editNewHTML(widget) {
            widget.widgetType = "HTML";
            widgetService.createWidget(model.pageId, model.userId, model.websiteId, widget)
                .then(function (response) {
                    model.widget = response.data;
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + model.widget._id);
                });
        }

    }

})();