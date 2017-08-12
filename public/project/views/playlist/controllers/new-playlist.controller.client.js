(function () {
    angular
        .module("rhythmShark")
        .controller("newPlaylistController", newPlaylistController);

    function newPlaylistController(playlistService, userService, $location) {
        var model = this;

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
            playlist.createdBy = model.user._id;
            playlistService.createPlaylist(playlist)
                .then(function () {
                    $location.url("/playlist" + model.user._id + "/playlist");
                });
        }
    }

})();