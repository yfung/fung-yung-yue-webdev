(function () {
    angular
        .module("yungApp")
        .factory("websiteService", websiteService);

    function websiteService($http) {

        var websites = [
            {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
            {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
            {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
            {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
            {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
            {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
        ];

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

        function deleteWebsite(websiteId) {
            for (var w in websites) {
                if (websites[w]._id === websiteId) {
                    websites.splice(w, 1);
                    return;
                }
            }
            return null;
        }

        function findWebsitesForUser(userId) {
            return $http.get("/api/user/" + userId + "/website")
                .then(function(response) {
                    return response.data;
                });
        }

    }

})();