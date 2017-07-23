(function () {
    angular
        .module("yungApp")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($routeParams, websiteService) {
        var model = this;

        model.userId = $routeParams.userId;

        model.addWebsite = addWebsite;

        function init() {
            model.websites = websiteService.findWebsitesForUser(model.userId);
        }
        init();

        function addWebsite() {
            model.website = websiteService.createWebsite(model.userId, model.website);
        }

    }

})();