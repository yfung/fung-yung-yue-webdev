(function () {
    angular
        .module("yungApp")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($routeParams, widgetService) {
        var model = this;

        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;
        model.pageId = $routeParams.pageId;

        function init() {

        }
        init();
        
    }

})();