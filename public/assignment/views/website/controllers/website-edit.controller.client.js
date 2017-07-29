(function () {
    angular
        .module("yungApp")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($routeParams, websiteService, $location) {
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

            websiteService
                .findWebsiteById(model.userId, model.websiteId)
                .then(function (response) {
                    model.website = response.data;
                });
        }

        init();

        function updateWebsite(website) {
            websiteService
                .updateWebsite(model.websiteId, model.userId, website)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website");
                });
        }

        function deleteWebsite() {
            websiteService
                .deleteWebsite(model.websiteId, model.userId)
                .then(function (response) {
                    if (response.data === "1") {
                        $location.url("/user/" + model.userId + "/website");
                    }
                });
        }
    }

})();