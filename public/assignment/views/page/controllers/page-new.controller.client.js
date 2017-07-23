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
            model.pages = pageService.findPagesByWebsiteId(model.websiteId);
        }
        init();

        function addPage() {
            model.page = pageService.createPage(model.websiteId, model.page);
        }

    }

})();