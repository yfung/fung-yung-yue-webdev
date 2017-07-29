(function () {
    angular
        .module("yungApp")
        .controller("widgetListController", widgetListController);

    function widgetListController($routeParams, widgetService, $sce) {
        var model = this;

        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;
        model.pageId = $routeParams.pageId;

        this.trustHTMLContent = trustHTMLContent;
        this.trustUrlResource = trustUrlResource;

        function init() {
            widgetService
                .findWidgetsByPageId(model.pageId, model.userId, model.websiteId)
                .then(function(widgets) {
                    model.widgets = widgets;
                });
        }
        init();

        function trustHTMLContent(htmlContent) {
            return $sce.trustAsHtml(htmlContent);
        }

        function trustUrlResource(url) {
            var youtubeUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split("/");
            youtubeUrl += urlParts[urlParts.length-1];
            return $sce.trustAsResourceUrl(youtubeUrl);
        }

    }

})();