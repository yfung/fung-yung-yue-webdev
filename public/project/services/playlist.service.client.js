(function () {
    angular
        .module("rhythmShark")
        .factory("playlistService", playlistService);

    function playlistService($http) {

        var api = {
            "deletePlaylist": deletePlaylist
        };
        return api;

        function deletePlaylist(playlistId) {
            return $http.delete("/api/playlists/" + playlistId);
        }
    }

})();