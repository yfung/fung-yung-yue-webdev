(function () {
    angular
        .module("rhythmShark")
        .controller("newPlaylistController", newPlaylistController);

    function newPlaylistController(playlistService, userService, $location, currentUser) {
        var model = this;
        model.userId = currentUser._id;

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
            playlistService.createPlaylist(model.userId, playlist)
                .then(function () {
                    $location.url("/community/playlist");
                });
        }
    }

})();