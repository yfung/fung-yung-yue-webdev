(function () {
    angular
        .module("rhythmShark")
        .controller("playlistDetailController", playlistDetailController);

    function playlistDetailController(playlistService, $location, $routeParams) {
        var model = this;

        model.userId = $routeParams["userId"];
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
                    $location.url("/profile/" + model.userId + "/playlist");
                });
        }

        function removeTrack(songId) {
            playlistService
                .removeTrack(songId)
                .then(function () {
                    $location.url("/profile/" + model.userId + "/playlist/" + model.playlistId);
                });
        }
    }

})();