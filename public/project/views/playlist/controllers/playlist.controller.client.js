(function () {
    angular
        .module("rhythmShark")
        .controller("playlistController", playlistController);

    function playlistController(playlistService, userService, $location, $routeParams) {
        var model = this;

        model.userId = $routeParams["userId"];

        model.deletePlaylist = deletePlaylist;

        function init() {
            userService.findUserById(model.userId)
                .then(function (response) {
                    model.user = response.data;
                    model.playlists = model.user.playlists;
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