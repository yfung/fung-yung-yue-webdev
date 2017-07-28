(function () {
    angular
        .module("yungApp")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams, pageService) {
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

        function addPage() {
            model.page = pageService.createPage(model.websiteId, model.page);
        }

    }

})();