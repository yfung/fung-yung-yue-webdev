(function () {
    angular
        .module("rhythmShark")
        .controller("playlistDetailController", playlistDetailController);

    function playlistDetailController(playlistService, $location, $routeParams, currentUser, userService) {
        var model = this;

        model.userId = currentUser._id;
        model.playlistId = $routeParams["playlistId"];

        model.deletePlaylist = deletePlaylist;
        model.removeTrack = removeTrack;
        model.logOut = logOut;
        model.goBack = goBack;
        model.updatePlaylist =updatePlaylist;

        function init() {
            playlistService.findPlaylistById(model.userId, model.playlistId)
                .then(function (response) {
                    model.playlist = response.data;
                    if (currentUser._id === model.playlist.createdBy || currentUser.isAdmin) {
                        model.edit = true;
                    }
                });
        }

        init();

        function logOut() {
            userService.logOut()
                .then(function (response) {
                    $location.url("/");
                });
        }

        function goBack() {
            window.history.back();
        }

        function updatePlaylist() {
            playlistService.updatePlaylist(model.userId, model.playlistId)
                .then(function () {
                    $location.url("/community/playlist/" + model.playlistId);
                });
        }

        function deletePlaylist() {
            playlistService.deletePlaylist(model.userId, model.playlistId)
                .then(function () {
                    $location.url("/community/playlist");
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