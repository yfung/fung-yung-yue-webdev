(function () {
    angular
        .module("rhythmShark")
        .controller("playlistDetailController", playlistDetailController);

    function playlistDetailController(playlistService, userService, $location, $routeParams) {
        var model = this;

        model.userId = $routeParams["userId"];
        model.playlistId = $routeParams["playlistId"];

        model.deletePlaylist = deletePlaylist;

        function init() {
            playlistService.findPlaylistById(model.userId, model.playlistId)
                .then(function (response) {
                    model.playlist = response.data;
                });
        }

        init();

        function deletePlaylist() {
            playlistService.deletePlaylist()
                .then(function () {
                    $location.url("/playlist" + model.user._id + "/playlist");
                });
        }
    }

})();