(function () {
    angular
        .module("yungApp")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams, pageService, $location) {
        var model = this;

        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;

        model.addPage = addPage;

        function init() {
            pageService
                .findPagesByWebsiteId(model.websiteId, model.userId)
                .then(function(pages) {
                    model.pages = pages;
                });
        }
        init();

        function addPage(page) {
            pageService
                .createPage(model.websiteId, model.userId, page)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
                });
        }

    }

})();