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
            websiteService
                .findWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });

            websiteService.findWebsiteById(model.userId, model.websiteId)
                .then(function (response) {
                    model.website = response.data;
                });
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