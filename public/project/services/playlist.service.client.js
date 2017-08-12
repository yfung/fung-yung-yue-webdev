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

        function createPlaylist(playlist) {
            return $http.post("/api/playlist/", playlist);
        }

        function deletePlaylist(playlistId) {
            return $http.delete("/api/playlist/" + playlistId);
        }
    }

})();