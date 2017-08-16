(function () {
    angular
        .module("rhythmShark")
        .controller("playlistDetailController", playlistDetailController);

    function playlistDetailController(playlistService, $location, $routeParams, currentUser) {
        var model = this;

        model.userId = currentUser._id;
        model.playlistId = $routeParams["playlistId"];

        model.deletePlaylist = deletePlaylist;
        model.removeTrack = removeTrack;

        function init() {
            playlistService.findPlaylistById(model.userId, model.playlistId)
                .then(function (response) {
                    model.playlist = response.data;
                });
        }

        init();

        function deletePlaylist() {
            playlistService.deletePlaylist(model.userId, model.playlistId)
                .then(function () {
                    $location.url("/community/" + model.userId + "/playlist");
                });
        }

        function removeTrack(song) {
            playlistService
                .removeSong(model.userId, model.playlistId, song.mbid)
                .then(function () {
                    window.location.reload(true);
                });
        }
    }

})();