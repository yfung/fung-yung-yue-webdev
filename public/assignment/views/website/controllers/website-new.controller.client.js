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
            model.website = websiteService.findWebsiteById(model.websiteId);
        }
        init();

        function addWebsite() {
            model.website = websiteService.createWebsite(model.userId, model.website);
            $location.url = "/" + site._id + "/page";
        }

    }

})();