(function () {
    angular
        .module("yungApp")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($routeParams, websiteService) {
        var model = this;

        model.userId = $routeParams.userId;

        model.addWebsite = addWebsite;

        function init() {
            websiteService.findWebsitesForUser(model.userId)
                .then(function(websites) {
                    model.websites = websites;
                })
        }
        init();

        function addWebsite(website) {
            websiteService
                .createWebsite(model.userId, website)
                .then(function() {

                });
        }

    }

})();