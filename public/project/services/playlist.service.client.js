(function () {
    angular
        .module("rhythmShark")
        .factory("playlistService", playlistService);

    function playlistService($http) {

        var api = {
            "createPlaylist": createPlaylist,
            "deletePlaylist": deletePlaylist,
            "findPlaylistById": findPlaylistById
        };
        return api;

        function findPlaylistById(userId, playlistId) {
            return $http.get("/api/profile/" + userId + "/playlist/" + playlistId);
        }

        function createPlaylist(userId, playlist) {
            return $http.post("/api/profile/" + userId + "/playlist/", playlist);
        }

        function deletePlaylist(userId, playlistId) {
            return $http.delete("/api/profile/" + userId + "/playlist/" + playlistId);
        }
    }

})();