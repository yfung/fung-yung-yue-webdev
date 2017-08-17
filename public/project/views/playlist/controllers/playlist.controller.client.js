(function () {
    angular
        .module("rhythmShark")
        .controller("playlistController", playlistController);

    function playlistController(playlistService, userService, currentUser, $location) {
        var model = this;

        model.userId = currentUser._id;

        model.deletePlaylist = deletePlaylist;
        model.logOut = logOut;
        model.goBack = goBack;

        function init() {
            userService.findUserById(model.userId)
                .then(function (response) {
                    model.user = response.data;
                    model.playlists = model.user.playlists;
                });
        }

        init();

        function goBack() {
            window.history.back();
        }

        function logOut() {
            userService.logOut()
                .then(function (response) {
                    $location.url("/");
                });
        }

        function deletePlaylist(playlist) {
            playlistService.deletePlaylist(playlist.createdBy, playlist._id)
                .then(function () {
                    window.location.reload(true);
                });
        }
    }

})();