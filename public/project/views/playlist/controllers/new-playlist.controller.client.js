(function () {
    angular
        .module("rhythmShark")
        .controller("newPlaylistController", newPlaylistController);

    function newPlaylistController(playlistService, userService, $location, $routeParams) {
        var model = this;
        model.userId = $routeParams["userId"];

        model.createPlaylist = createPlaylist;

        function init() {
            userService.findUserById(model.userId)
                .then(function (response) {
                    model.user = response.data;
                    model.playlists = model.user.playlists;
                });
        }

        init();

        function createPlaylist(playlist) {
            playlist.createdBy = model.userId;
            playlistService.createPlaylist(playlist)
                .then(function () {
                    $location.url("/profile/" + model.user._id + "/playlist");
                });
        }
    }

})();