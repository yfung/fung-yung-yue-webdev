(function () {
    angular
        .module("yungApp")
        .factory("pageService", pageService);

    function pageService($http) {

        var api = {
            "createPage": createPage,
            "findPagesByWebsiteId": findPagesByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };

        return api;

        function createPage(websiteId, userId, page) {
            return $http.post("/api/user/" + userId + "/website/" + websiteId +  "/page", page);
        }

        function findPagesByWebsiteId(websiteId, userId) {
            return $http.get("/api/user/" + userId + "/website/" + websiteId + "/page")
                .then(function (response) {
                    return response.data;
                });
        }

        function findPageById(pageId, userId, websiteId) {
            return $http.get("/api/user/" + userId + "/website/" + websiteId + "/page/" + pageId);
        }

        function updatePage(pageId, userId, websiteId, page) {
            $http.put("/api/user/" + userId + "/website/" + websiteId + "/page/" + pageId, page)
        }

        function deletePage(pageId, userId, websiteId) {
            $http.delete("/api/user/" + userId + "/website/" + websiteId + "/page/" + pageId);
        }

    }

})();