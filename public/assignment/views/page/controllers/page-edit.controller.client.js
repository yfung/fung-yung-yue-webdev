(function () {
    angular
        .module("yungApp")
        .controller("pageEditController", pageEditController);

    function pageEditController($routeParams, pageService, $location) {
        var model = this;

        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;
        model.pageId = $routeParams.pageId;

        model.editPage = editPage;
        model.deletePage = deletePage;

        function init() {
            pageService
                .findPagesByWebsiteId(model.websiteId, model.userId)
                .then(function (pages) {
                    model.pages = pages;
                });

            pageService
                .findPageById(model.pageId, model.userId, model.websiteId)
                .then(function (response) {
                    model.page = response.data;
                });
        }

        init();

        function editPage(page) {
            pageService
                .updatePage(model.pageId, model.userId, model.websiteId, page)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
                });
        }

        function deletePage() {
            pageService
                .deletePage(model.pageId)
                .then(function (response) {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
                });
        }

    }
})();