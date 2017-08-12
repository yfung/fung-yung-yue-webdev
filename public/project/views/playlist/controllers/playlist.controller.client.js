(function () {
    angular
        .module("rhythmShark")
        .controller("playlistController", playlistController);

    function playlistController($location, playlistService, userService) {
        var model = this;

        model.createPlaylist = createPlaylist;
        model.deletePlaylist = deletePlaylist;

        function init() {
            userService.findUserById(model.userId)
                .then(function (response) {
                    model.user = response.data;
                    model.playlists = model.user.playlists;
                });
        }

        init();

        function createPlaylist() {

        }

        function deletePlaylist() {

        }
    }

})();