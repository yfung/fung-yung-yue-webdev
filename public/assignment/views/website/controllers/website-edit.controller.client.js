(function () {
    angular
        .module("yungApp")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($routeParams, websiteService) {
        var model = this;

        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            model.websites = websiteService.findWebsitesForUser(model.userId);
        }
        init();

        function updateWebsite(website) {
            websiteService.updateWebsite(model.websiteId, website);
        }

        function deleteWebsite() {
            websiteService.deleteWebsite(model.websiteId);
        }
    }

})();