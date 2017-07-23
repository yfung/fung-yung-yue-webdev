(function () {
    angular
        .module("yungApp")
        .controller("pageEditController", pageEditController);

    function pageEditController($routeParams, pageService) {
        var model = this;

        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;
        model.pageId= $routeParams.pageId;

        model.editPage = editPage;
        model.deletePage = deletePage;

        function init() {
            model.pages = pageService.findPagesByWebsiteId(model.websiteId);
            model.page = pageService.findPageById(model.pageId)
        }
        init();

        function editPage() {
            model.page = pageService.updatePage(model.pageId, model.page);
        }

        function deletePage() {
            pageService.deletePage(model.pageId);
        }

    }

})();