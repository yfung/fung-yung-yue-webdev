(function () {
    angular
        .module("yungApp")
        .factory("websiteService", websiteService);

    function websiteService($http) {

        var api = {
            "findWebsitesForUser": findWebsitesForUser,
            "createWebsite": createWebsite,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };

        return api;

        function createWebsite(userId, website) {
            return $http.post("/api/user/" + userId + "/website", website);
        }

        function findWebsiteById(userId, websiteId) {
            return $http.get("/api/user/" + userId + "/website/" + websiteId);
        }

        function updateWebsite(websiteId, userId, website) {
            return $http.put("/api/user/" + userId + "/website/" + websiteId, website);

        }

        function deleteWebsite(websiteId, userId) {
            return $http.delete("/api/user/" + userId + "/website/" + websiteId);
        }

        function findWebsitesForUser(userId) {
            return $http.get("/api/user/" + userId + "/website")
                .then(function (response) {
                    return response.data;
                });
        }

    }

})();