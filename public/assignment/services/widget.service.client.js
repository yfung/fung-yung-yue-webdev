(function () {
    angular
        .module("yungApp")
        .factory("widgetService", widgetService);

    function widgetService($http) {

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };

        return api;

        function createWidget(pageId, userId, websiteId, widget) {
            return $http.post("/api/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget", widget);
        }

        function findWidgetsByPageId(pageId, userId, websiteId) {
            return $http.get("/api/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget")
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetById(widgetId, userId, websiteId, pageId) {
            return $http.get("/api/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
        }

        function updateWidget(widgetId, userId, websiteId, pageId, widget) {
            return $http.put("/api/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId, widget);
        }

        function deleteWidget(widgetId, userId, websiteId, pageId) {
            return $http.delete("/api/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
        }

    }

})();