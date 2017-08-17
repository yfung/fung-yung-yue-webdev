(function () {
    angular
        .module("rhythmShark")
        .factory("playlistService", playlistService);

    function playlistService($http) {

        var api = {
            "createPlaylist": createPlaylist,
            "deletePlaylist": deletePlaylist,
            "findPlaylistById": findPlaylistById,
            "addSong": addSong,
            "removeSong": removeSong,
            "updatePlaylist" : updatePlaylist
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

        function addSong(userId, playlistId, song) {
            return $http.put("/api/profile/" + userId + "/playlist/" + playlistId + "/song", song);
        }

        function removeSong(userId, playlistId, songId) {
            return $http.delete("/api/profile/" + userId + "/playlist/" + playlistId + "/song/" + songId);
        }

        function updatePlaylist(playlistId, playlist) {
            return $http.put("/api/playlist/" + playlistId, playlist);
        }
    }

})();