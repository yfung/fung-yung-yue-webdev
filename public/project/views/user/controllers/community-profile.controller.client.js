(function () {
    angular
        .module("rhythmShark")
        .controller("communityUserController", communityUserController);

    function communityUserController(userService, $routeParams, currentUser, playlistService) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.follow = follow;
        model.deletePlaylist = deletePlaylist;
        model.myId = currentUser._id;

        function init() {

            userService.findUserById(model.userId)
                .then(function (response) {
                    model.user = response.data;
                    if (currentUser._id != model.userId) {
                        if (currentUser.follows.length === 0) {
                            model.follows = "Follows";
                        }
                        for (var i = 0; i < currentUser.follows.length; i++) {
                            if (model.user._id === currentUser.follows[i]._id) {
                                model.followed = "Followed";
                                break;
                            } else {
                                model.follows = "Follows";
                            }
                        }
                    }
                    if (currentUser._id === model.userId || currentUser.isAdmin) {
                        model.edit = true;
                    }
                });
        }

        init();

        function follow() {
            userService
                .follow(currentUser._id, model.userId)
                .then(function () {
                    window.location.reload(true);
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