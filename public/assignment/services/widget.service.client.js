(function () {
    angular
        .module("yungApp")
        .factory("widgetService", widgetService);

    function widgetService($http) {

        var widgets = [
            {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"
            },
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

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