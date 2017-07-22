(function () {
    angular
        .module("yungApp")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($routeParams, websiteService) {
        var model = this;

        model.userId = $routeParams.userId;

        function init() {
            model.websites = websiteService.findWebsitesForUser(model.userId);
        }
        init();
    }

})();