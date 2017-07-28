(function () {
    angular
        .module("yungApp")
        .controller("pageListController", pageListController);

    function pageListController($routeParams, pageService) {
        var model = this;

        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;

        function init() {
            pageService
                .findPagesByWebsiteId(model.websiteId, model.userId)
                .then(function(pages) {
                    model.pages = pages;
                });
        }
        init();

    }

})();