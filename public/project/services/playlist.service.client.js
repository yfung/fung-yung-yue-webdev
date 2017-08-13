(function () {
    angular
        .module("rhythmShark")
        .factory("playlistService", playlistService);

    function playlistService($http) {

        var api = {
            "createPlaylist": createPlaylist,
            "deletePlaylist": deletePlaylist
        };
        return api;

        function createPlaylist(userId, playlist) {
            return $http.post("/api/profile/" + userId + "playlist/", playlist);
        }

        function deletePlaylist(userId, playlistId) {
            return $http.delete("/api/profile/" + userId + "playlist/" + playlistId);
        }
    }

})();