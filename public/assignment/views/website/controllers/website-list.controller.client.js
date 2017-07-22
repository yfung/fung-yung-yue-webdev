(function () {
    angular
        .module("yungApp")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, websiteService) {
        var model = this;

        var userId = $routeParams.userId;

        function init() {
            model.websites = websiteService.findWebsitesForUser(userId);
        }

        init();
    }

})();