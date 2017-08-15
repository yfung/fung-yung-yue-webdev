(function () {
    angular
        .module("rhythmShark")
        .controller("communityUserController", communityUserController);

    function communityUserController(userService, $location, $routeParams, $scope) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.follow = follow;
        model.unfollow = unfollow;

        function init() {
            userService.findUserById(model.userId)
                .then(function (response) {
                    model.user = response.data;
                    if (model.user._id in $scope.user.follows) {
                        model.followed = "Followed";
                    } else {
                        model.follows = "Follows";
                    }
                });
        }

        init();

        function follow() {
            userService
                .follow($scope.user._id, model.userId)
                .then(function (response) {
                    window.location.reload(true);
                });
        }

    }

})();